// 사용자 선호도 관련 타입 정의

// 온보딩 데이터 구조
export interface OnboardingData {
  answers: Record<number, string[]>;
  steps: Array<{
    title: string;
    subText?: string;
    options: string[];
    singleSelect?: boolean;
  }>;
}

// 서버에 저장되는 선호도 데이터 (간단한 key-value 형태)
export interface UserPreferencesData {
  [questionTitle: string]: string; // 질문 제목을 키로, 답변들을 문자열로 저장
}
