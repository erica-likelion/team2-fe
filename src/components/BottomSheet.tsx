import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './BottomSheet.css';
import filterButtonIcon from "../assets/icons/AdjustmentsOutline.svg";
import locationIcon from "../assets/icons/StarBadge.svg";


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

export interface BottomSheetRef {
  scrollToRestaurant: (restaurantId: number) => void;
}

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(({ restaurants, isExpanded, onExpandedChange }, ref) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const restaurantRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    scrollToRestaurant: (restaurantId: number) => {
      const restaurantElement = restaurantRefs.current[restaurantId];
      if (restaurantElement) {
        restaurantElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  }));

  const handleClick = () => {
    onExpandedChange(!isExpanded);
  };

  const handleBottomSheetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleCardClick = (restaurant: Restaurant) => {
    navigate(`/shop/${restaurant.id}`, { state: { restaurant } });
  };

  return (
    <div 
      className={`bottom-sheet ${isExpanded ? 'expanded' : ''}`}
      ref={sheetRef}
      onClick={handleBottomSheetClick}
    >
      <div className="bottom-sheet-handle" onClick={handleClick}>
        <div className="handle-bar"></div>
      </div>
      
      <div className="bottom-sheet-header" onClick={handleClick}>
        <div className="sheet-title">
          <span className="location-icon">
          <img src={locationIcon} alt="location-icon" />
          </span>
          이 지역의 그로서링 {restaurants.length}곳
        </div>
        <button className="filter-button">
          <img src={filterButtonIcon} alt="filter-button" />
        </button>
      </div>

      <div className="bottom-sheet-content">
        {restaurants.map((restaurant) => (
          <div 
            key={restaurant.id} 
            className="restaurant-card"
            ref={(el) => { restaurantRefs.current[restaurant.id] = el; }}
            onClick={() => handleCardClick(restaurant)}
          >
            <div className="restaurant-image">
              <img src={restaurant.image} alt={restaurant.name} />
              {restaurant.tags.includes('영업중') && (
                <div className="open-status-tag">영업중</div>
              )}
            </div>
            <div className="restaurant-info">
              <div className="restaurant-details">
                <h3 className="restaurant-name">{restaurant.name}</h3>
                <p className="restaurant-description">{restaurant.description}</p>
                <div className="restaurant-hours">{restaurant.hours}</div>
                <div className="restaurant-tags">
                  {restaurant.tags.filter(tag => tag !== '영업중').map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <button className="bookmark-button" onClick={(e) => { e.stopPropagation(); /* TODO: bookmark */ }}>
                🔖
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default BottomSheet;
