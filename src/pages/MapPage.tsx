import React, { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import SearchBar from '../components/SearchBar';
import BottomSheet from '../components/BottomSheet';
import './MapPage.css';

// 한양대 에리카 캠퍼스 좌표
const HANYANG_ERICA = { lat: 37.29644017218779, lng: 126.83516599926162 };

// 샘플 식당 데이터
const sampleRestaurants = [
  {
    id: 1,
    name: '영플렉스 그로서리 하우스',
    description: '신선한 해산물과 다양한 식재료를 만나보세요',
    hours: '영업시간: 08:00 - 22:00',
    tags: ['해산물', '주류 가능', '좋은푸드'],
    image: 'https://via.placeholder.com/150x150/4ade80/ffffff?text=Store'
  },
  {
    id: 2,
    name: '스프라마트 다노',
    description: '안산시 상록구 서론',
    hours: '영업시간: 09:00 - 20:00',
    tags: ['영업중'],
    image: 'https://via.placeholder.com/150x150/3b82f6/ffffff?text=Mart'
  },
  {
    id: 3,
    name: '에리카마트',
    description: '대학가 맛집, 신선한 재료로 만든 음식',
    hours: '영업시간: 10:00 - 21:00',
    tags: ['대학가', '신선함', '인기'],
    image: 'https://via.placeholder.com/150x150/f59e0b/ffffff?text=Erica'
  },
  {
    id: 4,
    name: '로컬마트 에리카점',
    description: '지역 최고의 식재료 전문점',
    hours: '영업시간: 07:00 - 23:00',
    tags: ['24시간', '편의점', '생활용품'],
    image: 'https://via.placeholder.com/150x150/ef4444/ffffff?text=Local'
  },
  {
    id: 5,
    name: '그린마켓',
    description: '친환경 유기농 식품 전문',
    hours: '영업시간: 08:30 - 19:30',
    tags: ['유기농', '친환경', '건강식품'],
    image: 'https://via.placeholder.com/150x150/10b981/ffffff?text=Green'
  }
];

const MapPage: React.FC = () => {
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);

  const handleMapClick = () => {
    if (isBottomSheetExpanded) {
      setIsBottomSheetExpanded(false);
    }
  };

  return (
    <div className="page">
      <div className="page-content">
        {/* 카카오 지도 */}
        <Map
          center={HANYANG_ERICA}
          style={{ width: "100%", height: "100%" }}
          level={3}
          onClick={handleMapClick}
        >
          <MapMarker position={HANYANG_ERICA}>
            <div style={{color:"#000"}}>한양대 에리카캠퍼스</div>
          </MapMarker>
          
          {/* 샘플 마커들 */}
          {sampleRestaurants.map((restaurant) => (
            <MapMarker
              key={restaurant.id}
              // 랜덤 위치 조정 (실제론 API로 받아와야 함)
              position={{
                lat: HANYANG_ERICA.lat + (Math.random() - 0.5) * 0.01,
                lng: HANYANG_ERICA.lng + (Math.random() - 0.5) * 0.01
              }}
            >
              <div style={{
                padding: "5px", 
                color: "#000", 
                fontSize: "12px",
                whiteSpace: "nowrap"
              }}>
                {restaurant.name}
              </div>
            </MapMarker>
          ))}
        </Map>

        {/* 플로팅 검색바 */}
        <SearchBar />

        {/* 바텀시트가 확장되었을 때 백드롭 */}
        {isBottomSheetExpanded && (
          <div 
            className="bottom-sheet-backdrop"
            onClick={() => setIsBottomSheetExpanded(false)}
          />
        )}

        {/* 바텀시트 */}
        <BottomSheet 
          restaurants={sampleRestaurants}
          isExpanded={isBottomSheetExpanded}
          onExpandedChange={setIsBottomSheetExpanded}
        />
      </div>
    </div>
  );
};

export default MapPage;
