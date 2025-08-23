import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Recipe, RecipeIngredient } from '../../services/api';
import Navbar from '../../components/Navbar';
import './RecipeDetail.css';
import menuImg from '../../assets/menuImg.svg';
import clock from '../../assets/icons/clock.svg'
import user from '../../assets/icons/user.svg'
import level from '../../assets/icons/Room Service Streamline Rounded Line - Material Symbols.svg'

const RecipeDetail = () => {
  const [activeTab, setActiveTab] = useState('ingredients');
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // 안전한 값 접근을 위한 헬퍼 함수들
  const getSafeValue = (value: string | null | undefined, defaultValue: string = "(미제공)"): string => {
    return value && value.trim() !== "" ? value : defaultValue;
  };

  const getSafeNumber = (value: number | null | undefined, defaultValue: number = 0): number => {
    return value !== null && value !== undefined && !isNaN(value) ? value : defaultValue;
  };

  const getSafeIngredients = (ingredients: RecipeIngredient[] | null | undefined) => {
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return [{ name: "재료 정보", amount: "(미제공)", estimatedPrice: "" }];
    }
    return ingredients.map(ingredient => ({
      name: getSafeValue(ingredient?.name, "재료명 미제공"),
      amount: getSafeValue(ingredient?.amount, ""),
      estimatedPrice: getSafeValue(ingredient?.estimatedPrice, "")
    }));
  };

  const getSafeInstructions = (instructions: string[] | null | undefined) => {
    if (!Array.isArray(instructions) || instructions.length === 0) {
      return ["조리법 정보가 제공되지 않았습니다."];
    }
    return instructions.filter(instruction => instruction && instruction.trim() !== "");
  };

  useEffect(() => {
    // location.state에서 레시피 데이터를 가져옴
    const state = location.state as { recipes?: Recipe[], storeInfo?: unknown } | null;
    
    if (state?.recipes && state.recipes.length > 0) {
      // 첫 번째 레시피를 현재 레시피로 설정 (나중에 여러 레시피 중 선택할 수 있도록 확장 가능)
      setCurrentRecipe(state.recipes[0]);
    } else {
      // 레시피 데이터가 없으면 홈으로 이동
      console.warn('No recipe data found, redirecting to home');
      navigate('/home');
    }
  }, [location.state, navigate]);

  const handleCheckboxClick = (index: number) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(index)) {
      newCheckedItems.delete(index);
    } else {
      newCheckedItems.add(index);
    }
    setCheckedItems(newCheckedItems);
  };

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  // 레시피가 로드되지 않은 경우 로딩 표시
  if (!currentRecipe) {
    return (
      <div className="recipe-detail-container">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          레시피를 불러오는 중...
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-detail-container">
      {/* Top Header with Bookmark */}
      <div className="header">
        <div className={`bookmark-icon ${isBookmarked ? 'active' : ''}`} onClick={handleBookmarkClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 21L12 16L5 21V5C5 3.9 5.9 3 7 3H17C18.1 3 19 3.9 19 5V21Z" stroke="#1F6B43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Recipe Main Image */}
      <div className="recipe-image-container">
        <div className="image-wrapper">
          <img src={menuImg} alt="menuImg" width="130" height="130" />
        </div>
        {/* Recipe Metadata Card */}
      <div className="metadata-card">
        <div className="metadata-item">
          <div className="metadata-icon">
            <img src={clock} alt="clock" />
          </div>
          <span>{getSafeNumber(currentRecipe.cookingTime)}분</span>
        </div>
        <div className="metadata-item">
          <div className="metadata-icon">
            <img src={user} alt="user" />
          </div>
          <span>{getSafeValue(currentRecipe.cuisine, "요리 타입")}</span>
        </div>
        <div className="metadata-item">
          <div className="metadata-icon">
            <img src={level} alt="level" />
          </div>
          <span>{getSafeValue(currentRecipe.difficulty, "난이도")}</span>
        </div>
      </div>
      </div>


      {/* Recipe Title and Description */}
      <div className="recipe-info">
        <h1 className="recipe-title-korean">{getSafeValue(currentRecipe.name, "레시피명")}</h1>
        <h2 className="recipe-title-english">{getSafeValue(currentRecipe.cuisine, "요리")} Recipe</h2>
        <div className="recipe-description">
          <p>{getSafeValue(currentRecipe.description, "레시피 설명이 제공되지 않았습니다.")}</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-container">
        <button 
          className={`tab ${activeTab === 'ingredients' ? 'active' : ''}`}
          onClick={() => setActiveTab('ingredients')}
        >
          재료
        </button>
        <button 
          className={`tab ${activeTab === 'cooking' ? 'active' : ''}`}
          onClick={() => setActiveTab('cooking')}
        >
          조리 과정
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'ingredients' && (
        <div className="ingredients-list">
          {getSafeIngredients(currentRecipe.ingredients).map((ingredient, index) => (
            <div key={index} className="ingredient-item">
              <div 
                className={`checkbox ${checkedItems.has(index) ? 'checked' : ''}`}
                onClick={() => handleCheckboxClick(index)}
              ></div>
              <span>{ingredient.name} {ingredient.amount}</span>
              {ingredient.estimatedPrice && ingredient.estimatedPrice.trim() !== "" && (
                <span className="ingredient-price">({ingredient.estimatedPrice})</span>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'cooking' && (
        <div className="cooking-process">
          {getSafeInstructions(currentRecipe.instructions).map((instruction, index) => (
            <div key={index} className="cooking-step">
              <div className="step-number">{index + 1}</div>
              <div className="step-content">
                <p>{instruction}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Navbar />
    </div>
  );
};

export default RecipeDetail;
