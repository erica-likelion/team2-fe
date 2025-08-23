import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './RecipeDetail.css';
import menuImg from '../assets/menuImg.svg';
import clock from '../assets/icons/clock.svg'
import user from '../assets/icons/user.svg'
import level from '../assets/icons/Room Service Streamline Rounded Line - Material Symbols.svg'

const RecipeDetail = () => {
  const [activeTab, setActiveTab] = useState('ingredients');
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [isBookmarked, setIsBookmarked] = useState(false);

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
          <span>25분</span>
        </div>
        <div className="metadata-item">
          <div className="metadata-icon">
            <img src={user} alt="user" />
          </div>
          <span>1인분</span>
        </div>
        <div className="metadata-item">
          <div className="metadata-icon">
            <img src={level} alt="level" />
          </div>
          <span>쉬움</span>
        </div>
      </div>
      </div>


      {/* Recipe Title and Description */}
      <div className="recipe-info">
        <h1 className="recipe-title-korean">카쵸 에 페페</h1>
        <h2 className="recipe-title-english">Cacio e Pepe</h2>
        <div className="recipe-description">
          <p>간단한 볶음 요리를 좋아하는 AEAO님에게 추천해요</p>
          <p>쉽게 요리할 수 있어요</p>
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
          <div className="ingredient-item">
            <div 
              className={`checkbox ${checkedItems.has(0) ? 'checked' : ''}`}
              onClick={() => handleCheckboxClick(0)}
            ></div>
            <span>토나렐리 파스타 100g</span>
          </div>
          <div className="ingredient-item">
            <div 
              className={`checkbox ${checkedItems.has(1) ? 'checked' : ''}`}
              onClick={() => handleCheckboxClick(1)}
            ></div>
            <span>페코리노 로마노 치즈 80g</span>
          </div>
          <div className="ingredient-item">
            <div 
              className={`checkbox ${checkedItems.has(2) ? 'checked' : ''}`}
              onClick={() => handleCheckboxClick(2)}
            ></div>
            <span>흑후추 1큰술</span>
          </div>
          <div className="ingredient-item">
            <div 
              className={`checkbox ${checkedItems.has(3) ? 'checked' : ''}`}
              onClick={() => handleCheckboxClick(3)}
            ></div>
            <span>굵은 소금</span>
          </div>
        </div>
      )}

      {activeTab === 'cooking' && (
        <div className="cooking-process">
          <div className="cooking-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <p>파스타를 끓는 소금물에 넣고 8-10분간 삶습니다.</p>
            </div>
          </div>
          <div className="cooking-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <p>치즈를 갈아서 준비하고 후추를 갈아둡니다.</p>
            </div>
          </div>
          <div className="cooking-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <p>파스타 삶은 물을 조금 남겨두고 파스타를 건져냅니다.</p>
            </div>
          </div>
          <div className="cooking-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <p>팬에 치즈와 후추를 넣고 파스타 삶은 물을 조금씩 넣어가며 섞습니다.</p>
            </div>
          </div>
          <div className="cooking-step">
            <div className="step-number">5</div>
            <div className="step-content">
              <p>파스타를 넣고 잘 섞어 완성합니다.</p>
            </div>
          </div>
        </div>
      )}

      <Navbar />
    </div>
  );
};

export default RecipeDetail;
