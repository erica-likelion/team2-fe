import React, { useRef } from 'react';
import './BottomSheet.css';

interface Restaurant {
  id: number;
  name: string;
  description: string;
  hours: string;
  tags: string[];
  image: string;
}

interface BottomSheetProps {
  restaurants: Restaurant[];
  isExpanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ restaurants, isExpanded, onExpandedChange }) => {
  // const [startY, setStartY] = useState(0);
  // const [currentY, setCurrentY] = useState(0);
  // const [isDragging, setIsDragging] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  // 슬라이딩 인식 구현하려 했으나 PWA에서 하단 스와이프가 refresh로 인식되어 주석처리
  /*
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const deltaY = currentY - startY;
    
    if (Math.abs(deltaY) > 50) {
      if (deltaY < 0) {
        // 위로 스와이프 - 확장
        setIsExpanded(true);
      } else {
        // 아래로 스와이프 - 축소
        setIsExpanded(false);
      }
    }
    
    setIsDragging(false);
    setStartY(0);
    setCurrentY(0);
  };

  const handleClick = () => {
    if (!isDragging) {
      setIsExpanded(!isExpanded);
    }
  };*/

  const handleClick = () => {
    onExpandedChange(!isExpanded);
  };

  const handleBottomSheetClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 백드롭으로의 이벤트 전파 방지
  };

  return (
    <div 
      className={`bottom-sheet ${isExpanded ? 'expanded' : ''}`}
      ref={sheetRef}
      /* onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd} */
      onClick={handleBottomSheetClick}
    >
      <div className="bottom-sheet-handle" onClick={handleClick}>
        <div className="handle-bar"></div>
      </div>
      
      <div className="bottom-sheet-header" onClick={handleClick}>
        <div className="sheet-title">
          <span className="location-icon">📍</span>
          이 지역의 그로세링 {restaurants.length}곳
        </div>
        <button className="filter-button">
          ⚙️
        </button>
      </div>

      <div className="bottom-sheet-content">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-card">
            <div className="restaurant-image">
              <img src={restaurant.image} alt={restaurant.name} />
            </div>
            <div className="restaurant-info">
              <h3 className="restaurant-name">{restaurant.name}</h3>
              <p className="restaurant-description">{restaurant.description}</p>
              <div className="restaurant-hours">{restaurant.hours}</div>
              <div className="restaurant-tags">
                {restaurant.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button className="bookmark-button">
              🔖
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomSheet;
