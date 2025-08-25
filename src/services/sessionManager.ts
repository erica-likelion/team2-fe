import { sessionApi } from './api';

// 로컬 스토리지 키
const GUEST_ID_KEY = 'guest_id';
const SESSION_EXPIRY_KEY = 'session_expiry';

// 세션 만료 시간 (24시간)
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24시간 (ms)

export class SessionManager {
  private guestId: string | null = null;

  constructor() {
    this.loadSessionFromStorage();
  }

  // 로컬 스토리지에서 세션 정보 로드
  private loadSessionFromStorage(): void {
    try {
      const storedGuestId = localStorage.getItem(GUEST_ID_KEY);
      const storedExpiry = localStorage.getItem(SESSION_EXPIRY_KEY);
      
      if (storedGuestId && storedExpiry) {
        const expiryTime = parseInt(storedExpiry);
        if (Date.now() < expiryTime) {
          this.guestId = storedGuestId;
          console.log('Loaded existing session:', storedGuestId);
        } else {
          // 만료된 세션 정리
          this.clearSession();
          console.log('Session expired, cleared from storage');
        }
      }
    } catch (error) {
      console.error('Failed to load session from storage:', error);
      this.clearSession();
    }
  }

  // 세션 정보를 로컬 스토리지에 저장
  private saveSessionToStorage(guestId: string): void {
    try {
      const expiryTime = Date.now() + SESSION_DURATION;
      localStorage.setItem(GUEST_ID_KEY, guestId);
      localStorage.setItem(SESSION_EXPIRY_KEY, expiryTime.toString());
      this.guestId = guestId;
      console.log('Session saved to storage:', guestId);
    } catch (error) {
      console.error('Failed to save session to storage:', error);
    }
  }

  // 세션 정리
  private clearSession(): void {
    try {
      localStorage.removeItem(GUEST_ID_KEY);
      localStorage.removeItem(SESSION_EXPIRY_KEY);
      this.guestId = null;
    } catch (error) {
      console.error('Failed to clear session:', error);
    }
  }

  // 현재 게스트 ID 반환
  getGuestId(): string | null {
    return this.guestId;
  }

  // 세션 유효성 확인
  isSessionValid(): boolean {
    if (!this.guestId) return false;
    
    try {
      const storedExpiry = localStorage.getItem(SESSION_EXPIRY_KEY);
      if (!storedExpiry) return false;
      
      const expiryTime = parseInt(storedExpiry);
      return Date.now() < expiryTime;
    } catch (error) {
      console.error('Failed to check session validity:', error);
      return false;
    }
  }

  // 새로운 게스트 세션 초기화
  async initializeGuestSession(): Promise<string> {
    try {
      console.log('Initializing new guest session...');
      console.log('Making request to /guest/session endpoint...');
      const guestId = await sessionApi.createGuestSession();
      console.log('Received guest session response:', guestId);
      
      if (guestId && typeof guestId === 'string') {
        this.saveSessionToStorage(guestId);
        console.log('Guest session initialized successfully:', guestId);
        return guestId;
      } else {
        throw new Error('Invalid guest ID received from server');
      }
    } catch (error) {
      console.error('Failed to initialize guest session:', error);
      throw error;
    }
  }

  // 세션 갱신
  async renewSession(): Promise<string> {
    if (!this.guestId) {
      console.log('No existing session, creating new one...');
      return this.initializeGuestSession();
    }

    try {
      console.log('Renewing session for:', this.guestId);
      console.log('Making request to /renew/session endpoint with guestId:', this.guestId);
      const response = await sessionApi.renewSession(this.guestId);
      console.log('Received session renewal response:', response);
      
      // 세션 갱신 성공 시 만료 시간 업데이트
      const expiryTime = Date.now() + SESSION_DURATION;
      localStorage.setItem(SESSION_EXPIRY_KEY, expiryTime.toString());
      
      // 갱신된 세션 ID가 다를 수 있으므로 업데이트
      if (response && typeof response === 'string') {
        this.guestId = response;
        localStorage.setItem(GUEST_ID_KEY, response);
      }
      
      console.log('Session renewed successfully:', response);
      return response;
    } catch (error) {
      console.error('Failed to renew session, creating new one:', error);
      // 갱신 실패 시 새 세션 생성
      this.clearSession();
      return this.initializeGuestSession();
    }
  }

  // 세션 확보 (없으면 생성, 만료되었으면 갱신)
  async ensureSession(): Promise<string> {
    // 세션이 없거나 만료된 경우 새로 생성
    if (!this.isSessionValid()) {
      console.log('Session is invalid or expired, creating new session...');
      return this.initializeGuestSession();
    }
    
    // 세션이 곧 만료될 예정이면 갱신 (2시간 이내)
    const storedExpiry = localStorage.getItem(SESSION_EXPIRY_KEY);
    if (storedExpiry) {
      const expiryTime = parseInt(storedExpiry);
      const twoHours = 2 * 60 * 60 * 1000;
      
      if ((expiryTime - Date.now()) < twoHours) {
        console.log('Session expiring soon, renewing...');
        try {
          return await this.renewSession();
        } catch (error) {
          console.error('Failed to renew expiring session, creating new one:', error);
          return this.initializeGuestSession();
        }
      }
    }
    
    console.log('Using existing valid session:', this.guestId);
    return this.guestId!;
  }

  // 세션 강제 재설정
  async resetSession(): Promise<string> {
    this.clearSession();
    return this.initializeGuestSession();
  }
}

// 싱글톤 인스턴스
export const sessionManager = new SessionManager();

// 편의 함수들
export const getGuestId = (): string | null => sessionManager.getGuestId();
export const ensureSession = (): Promise<string> => sessionManager.ensureSession();
export const renewSession = (): Promise<string> => sessionManager.renewSession();
export const resetSession = (): Promise<string> => sessionManager.resetSession();
