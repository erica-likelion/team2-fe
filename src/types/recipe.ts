// 레시피 관련 타입 정의
export interface RecipeIngredient {
  name: string;
  amount: string;
  estimatedPrice: string;
}

export interface Recipe {
  name: string;
  cuisine: string;
  difficulty: string;
  cookingTime: number;
  ingredients: RecipeIngredient[];
  instructions: string[];
  description: string;
}

export interface AIRecipeRequest {
  storeId: number;
  additionalRequirements?: string;
}

export interface AIRecipeResponse {
  recipes: Recipe[];
}

export interface StoreInfo {
  id: number;
  name: string;
  description?: string;
  // 다른 매장 관련 속성들...
}
