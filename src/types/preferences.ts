// 사용자 선호도 관련 타입 정의

// 음식 카테고리
export type FoodCategory = 
  | 'chinese'      // 중국 음식
  | 'japanese'     // 일본 음식
  | 'italian'      // 이탈리아 음식
  | 'indian'       // 인도 음식
  | 'southeast_asian' // 동남아 음식
  | 'french'       // 프랑스 음식
  | 'south_american' // 남미 음식
  | 'american'     // 북미 음식
  | 'alcohol'      // 세계 주류
  | 'tea_coffee';  // 티/커피

// 사용자 선호도 데이터
export interface UserPreferences {
  guestId: string;
  favoriteCategories: FoodCategory[];
  dislikedCategories?: FoodCategory[];
  dietaryRestrictions?: string[]; // 예: ['halal', 'vegetarian', 'vegan']
  spiceLevel?: 'mild' | 'medium' | 'spicy' | 'very_spicy';
  budgetRange?: 'low' | 'medium' | 'high';
  preferredRegions?: string[]; // 예: ['사동', '본오동']
  createdAt?: string;
  updatedAt?: string;
}

// 간단한 온보딩 데이터 구조
export interface OnboardingData {
  answers: Record<number, string[]>;
  steps: Array<{
    title: string;
    options: string[];
    singleSelect?: boolean;
  }>;
}

// 선호도 업데이트 요청
export interface UpdatePreferencesRequest {
  guestId: string;
  preferences: Partial<UserPreferences>;
}
