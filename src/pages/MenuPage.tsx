import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './MenuPage.css';
import menucharacter from '../assets/menucharacter.png' 
import menuImg from '../assets/menuImg.svg'

const MenuPage = () => {
  const navigate = useNavigate();

  const handleRecipeClick = () => {
    navigate('/recipe-waiting');
  };

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1 className="page-title">오늘의 <span style={{color: '#1F6B43'}}>추천 메뉴</span></h1>
      </div>
      
      {/* Character and Speech Bubble Section */}
      <div className="character-section">
        <img src={menucharacter} alt="menucharacter" />
        <div className="speech-bubble">
          <p>스쿠데리아 디노 에서</p>
          <p>필요한 재료를 구매할 수 있어요!</p>
        </div>
      </div>

      {/* Recipe Card */}
      <div className="recipe-card">
        <div className="recipe-content">
          <div className="recipe-image">
            <img src={menuImg} alt="menuImg" width="130" height="130" />
          </div>
          <div className="recipe-info">
            <h2 className="recipe-title-korean">카쵸 에 페페</h2>
            <h3 className="recipe-title-english">Cacio e Pepe</h3>

            <div className="recipe-description">
              이탈리아 로마의 전통 파스타<br />
              간단한 재료로 만드는 깊은 풍미
            </div>
            
          </div>
        </div>
        <div className="recipe-link" onClick={handleRecipeClick} style={{cursor: 'pointer'}}>
          자세한 레시피 보러가기 →
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="floating-buttons">
        <button className="recommendation-btn" onClick={handleRecipeClick}>
          어떤 레시피를 추천받을까요?
        </button>
        <button className="scroll-top-btn">
          ↑
        </button>
      </div>
      
      <Navbar />
    </div>
  );
};

export default MenuPage
