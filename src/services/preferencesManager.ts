import type { UserPreferences, OnboardingData, FoodCategory } from '../types/preferences';
import { sessionManager } from './sessionManager';
import { userPreferencesApi } from './api';

// 로컬 스토리지 키
const PREFERENCES_KEY = 'user_preferences';
const ONBOARDING_DATA_KEY = 'onboarding_data';

export class PreferencesManager {
  private preferences: UserPreferences | null = null;

  constructor() {
    this.loadPreferencesFromStorage();
  }

  // 로컬 스토리지에서 선호도 로드
  private loadPreferencesFromStorage(): void {
    try {
      const storedPreferences = localStorage.getItem(PREFERENCES_KEY);
      if (storedPreferences) {
        this.preferences = JSON.parse(storedPreferences);
        console.log('Loaded user preferences from storage');
      }
    } catch (error) {
      console.error('Failed to load preferences from storage:', error);
      this.preferences = null;
    }
  }

  // 선호도를 로컬 스토리지에 저장
  private savePreferencesToStorage(preferences: UserPreferences): void {
    try {
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
      this.preferences = preferences;
      console.log('User preferences saved to storage');
    } catch (error) {
      console.error('Failed to save preferences to storage:', error);
    }
  }

  // 현재 사용자 선호도 반환
  getPreferences(): UserPreferences | null {
    return this.preferences;
  }

  // 선호도 존재 여부 확인
  hasPreferences(): boolean {
    return localStorage.getItem('onboarding_completed') === 'true';
  }

  // 온보딩 데이터 임시 저장
  saveOnboardingData(data: OnboardingData): void {
    try {
      localStorage.setItem(ONBOARDING_DATA_KEY, JSON.stringify(data));
      console.log('Onboarding data saved temporarily');
    } catch (error) {
      console.error('Failed to save onboarding data:', error);
    }
  }

  // 온보딩 완료 처리
  async completeOnboarding(): Promise<boolean> {
    try {
      const guestId = await sessionManager.ensureSession();
      const storedData = localStorage.getItem(ONBOARDING_DATA_KEY);
      
      if (!storedData) {
        throw new Error('온보딩 데이터가 없습니다');
      }

      const onboardingData: OnboardingData = JSON.parse(storedData);
      
      // UserPreferences는 더 이상 사용하지 않음 - 오직 JSON 데이터만 처리
      // 서버에 간단한 JSON으로 저장
      try {
        const serverData: Record<string, string> = {};
        
        // 질문-답변 매핑
        Object.entries(onboardingData.answers).forEach(([stepIndex, answers]) => {
          const stepNum = parseInt(stepIndex);
          const step = onboardingData.steps[stepNum];
          
          if (step && answers && answers.length > 0) {
            serverData[step.title] = answers.join(', ');
          }
        });
        
        // 메타데이터 추가
        serverData['완료시간'] = new Date().toISOString();
        serverData['게스트ID'] = guestId;
        
        await userPreferencesApi.savePreferences(serverData);
        console.log('온보딩 데이터 서버 저장 완료:', serverData);
      } catch (error) {
        console.error('서버 저장 실패:', error);
        throw error;
      }

      // 로컬에는 간단히 완료 플래그만 저장
      localStorage.setItem('onboarding_completed', 'true');
      localStorage.removeItem(ONBOARDING_DATA_KEY);

      console.log('온보딩 완료');
      return true;
    } catch (error) {
      console.error('온보딩 완료 실패:', error);
      throw error;
    }
  }

  // 선호도 업데이트
  async updatePreferences(updates: Partial<UserPreferences>): Promise<UserPreferences> {
    try {
      const guestId = await sessionManager.ensureSession();
      
      const updatedPreferences: UserPreferences = {
        ...this.preferences,
        ...updates,
        guestId,
        updatedAt: new Date().toISOString(),
      } as UserPreferences;

      this.savePreferencesToStorage(updatedPreferences);
      console.log('Preferences updated', updatedPreferences);
      return updatedPreferences;
    } catch (error) {
      console.error('Failed to update preferences:', error);
      throw error;
    }
  }

  // 특정 카테고리를 좋아하는 카테고리에 추가
  async addFavoriteCategory(category: FoodCategory): Promise<UserPreferences> {
    const currentPreferences = this.getPreferences();
    const currentFavorites = currentPreferences?.favoriteCategories || [];
    
    if (!currentFavorites.includes(category)) {
      const newFavorites = [...currentFavorites, category];
      return this.updatePreferences({ favoriteCategories: newFavorites });
    }
    
    return currentPreferences!;
  }

  // 특정 카테고리를 좋아하는 카테고리에서 제거
  async removeFavoriteCategory(category: FoodCategory): Promise<UserPreferences> {
    const currentPreferences = this.getPreferences();
    const currentFavorites = currentPreferences?.favoriteCategories || [];
    
    const newFavorites = currentFavorites.filter(cat => cat !== category);
    return this.updatePreferences({ favoriteCategories: newFavorites });
  }

  // 선호도 초기화
  clearPreferences(): void {
    try {
      localStorage.removeItem(PREFERENCES_KEY);
      localStorage.removeItem(ONBOARDING_DATA_KEY);
      localStorage.removeItem('onboarding_completed');
      this.preferences = null;
      console.log('User preferences cleared');
    } catch (error) {
      console.error('Failed to clear preferences:', error);
    }
  }

  // 특정 카테고리에 대한 선호도 확인
  isFavoriteCategory(category: FoodCategory): boolean {
    return this.preferences?.favoriteCategories.includes(category) || false;
  }
}

// 싱글톤 인스턴스
export const preferencesManager = new PreferencesManager();

// 편의 함수들
export const getPreferences = (): UserPreferences | null => preferencesManager.getPreferences();
export const hasPreferences = (): boolean => preferencesManager.hasPreferences();
export const updatePreferences = (updates: Partial<UserPreferences>): Promise<UserPreferences> => 
  preferencesManager.updatePreferences(updates);
export const completeOnboarding = (): Promise<boolean> => preferencesManager.completeOnboarding();
export const clearPreferences = (): void => preferencesManager.clearPreferences();
