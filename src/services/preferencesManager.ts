import type { OnboardingData } from '../types/preferences';
import { userPreferencesApi } from './api';

// 로컬 스토리지 키
const ONBOARDING_DATA_KEY = 'onboarding_data';

export class PreferencesManager {
  constructor() {
    // 간단하게 온보딩 완료 여부만 관리
  }

  // 온보딩 완료 여부 확인
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

  // 온보딩 데이터 가져오기
  getOnboardingData(): OnboardingData | null {
    try {
      const storedData = localStorage.getItem(ONBOARDING_DATA_KEY);
      return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error('Failed to get onboarding data:', error);
      return null;
    }
  }

  // 온보딩 완료 처리
  async completeOnboarding(): Promise<boolean> {
    try {
      const storedData = localStorage.getItem(ONBOARDING_DATA_KEY);
      
      if (!storedData) {
        throw new Error('온보딩 데이터가 없습니다');
      }

      const onboardingData: OnboardingData = JSON.parse(storedData);
      
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

  // 온보딩 데이터 초기화
  clearPreferences(): void {
    try {
      localStorage.removeItem(ONBOARDING_DATA_KEY);
      localStorage.removeItem('onboarding_completed');
      console.log('Onboarding data cleared');
    } catch (error) {
      console.error('Failed to clear preferences:', error);
    }
  }
}

// 싱글톤 인스턴스
export const preferencesManager = new PreferencesManager();

// 편의 함수들
export const hasPreferences = (): boolean => preferencesManager.hasPreferences();
export const saveOnboardingData = (data: OnboardingData): void => preferencesManager.saveOnboardingData(data);
export const getOnboardingData = (): OnboardingData | null => preferencesManager.getOnboardingData();
export const completeOnboarding = (): Promise<boolean> => preferencesManager.completeOnboarding();
export const clearPreferences = (): void => preferencesManager.clearPreferences();
