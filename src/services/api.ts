// API 기본 설정
const API_BASE_URL = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_BASE_URL;

// API 응답 타입 정의
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 세션 관련 타입
export interface GuestSessionResponse {
  guestId: string;
}

export interface SessionRenewRequest {
  guestId: string;
}

// API 클라이언트 클래스
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // 기본 fetch 래퍼
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      credentials: 'include', // 쿠키 자동 전송
      headers: {
        'accept': '*/*',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // 응답이 JSON이 아닐 수 있으므로 텍스트로 먼저 받기
      const text = await response.text();
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
      }

      // JSON 파싱 시도, 실패하면 텍스트 그대로 반환
      try {
        return JSON.parse(text);
      } catch {
        return text as T;
      }
    } catch (error) {
      console.error(`API request failed: ${url}`, error);
      throw error;
    }
  }

  // GET 요청
  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
      headers,
    });
  }

  // POST 요청
  async post<T>(
    endpoint: string,
    body?: Record<string, unknown> | string | null,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  // PUT 요청
  async put<T>(
    endpoint: string,
    body?: Record<string, unknown> | string | null,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  // DELETE 요청
  async delete<T>(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      headers,
    });
  }
}

// API 클라이언트 인스턴스 생성
const apiClient = new ApiClient(API_BASE_URL);

// 세션 API 함수들
export const sessionApi = {
  // 게스트 세션 발급
  async createGuestSession(): Promise<string> {
    try {
      const response = await apiClient.post<string>('/guest/session');
      return response;
    } catch (error) {
      console.error('Failed to create guest session:', error);
      throw error;
    }
  },

  // 세션 갱신
  async renewSession(guestId: string): Promise<string> {
    try {
      const response = await apiClient.post<string>('/renew/session', { guestId });
      return response;
    } catch (error) {
      console.error('Failed to renew session:', error);
      throw error;
    }
  },
};

// AI 레시피 추천 관련 타입 정의
export interface AIRecipeRequest {
  storeId: number;
  additionalRequirements?: string;
}

export interface RecipeIngredient {
  name: string | null;
  amount: string | null;
  estimatedPrice: string | null;
}

export interface Recipe {
  name: string | null;
  cuisine: string | null;
  difficulty: string | null;
  cookingTime: number | null;
  thumbnail: string | null;
  ingredients: RecipeIngredient[] | null;
  instructions: string[] | null;
  description: string | null;
}

export interface AIRecipeResponse {
  recipes: Recipe[];
}

// 상점 상품 관련 타입 정의
export interface Product {
  id: number;
  name: string;
  imageUrl: string;
}

export interface GroceryProductsResponse {
  groceryId: number;
  groceryName: string;
  shotAddress: string;
  country: string;
  openTime: string;
  closeTime: string;
  products: Product[];
}

// 사용자 선호도 API 함수들
export const userPreferencesApi = {
  // 사용자 선호도 저장
  async savePreferences(preferences: Record<string, string>): Promise<void> {
    try {
      // preferences 객체를 JSON 문자열로 변환
      const preferenceString = JSON.stringify(preferences);
      
      const response = await apiClient.post<void>('/user/preferences', {
        preference: preferenceString
      });
      
      console.log('User preferences saved successfully');
      return response;
    } catch (error) {
      console.error('Failed to save user preferences:', error);
      throw error;
    }
  },
};

// AI 레시피 추천 API 함수들
export const aiRecipeApi = {
  // AI 레시피 추천 요청
  async recommendRecipes(storeId: number, additionalRequirements: string = "none"): Promise<AIRecipeResponse> {
    try {
      const requestBody = {
        storeId,
        additionalRequirements
      };
      console.log('Requesting AI recipe recommendations:', requestBody);
      const response = await apiClient.post<AIRecipeResponse>('/api/ai/recipes/recommend', requestBody);
      console.log('AI recipe recommendations received:', response);
      return response;
    } catch (error) {
      console.error('Failed to get AI recipe recommendations:', error);
      throw error;
    }
  },
};

// 상점 상품 API 함수들
export const groceryProductsApi = {
  // 상점별 상품 목록 조회
  async getGroceryProducts(groceryId: number): Promise<GroceryProductsResponse> {
    try {
      console.log('Requesting grocery products for store:', groceryId);
      const response = await apiClient.get<GroceryProductsResponse>(`/api/grocery/${groceryId}/products`);
      console.log('Grocery products received:', response);
      return response;
    } catch (error) {
      console.error('Failed to get grocery products:', error);
      throw error;
    }
  },
};

export default apiClient;
