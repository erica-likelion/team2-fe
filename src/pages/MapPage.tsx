import React, { useState, useEffect } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import SearchBar from '../components/SearchBar';
import BottomSheet from '../components/BottomSheet';
import './MapPage.css';

// 한양대 에리카 캠퍼스 좌표
const HANYANG_ERICA = { lat: 37.29644017218779, lng: 126.83516599926162 };

// 샘플 식당 데이터 (좌표값 포함)
const sampleRestaurants = [
  {
    id: 1,
    name: '영플렉스 그로서리 하우스',
    description: '신선한 해산물과 다양한 식재료를 만나보세요',
    hours: '영업시간: 08:00 - 22:00',
    tags: ['해산물', '주류 가능', '좋은푸드'],
    image: '/images/store_1.jpg',
    position: { lat: 37.29744017218779, lng: 126.8341659992616 }
  },
  {
    id: 2,
    name: '스프라마트 다노',
    description: '안산시 상록구 서론',
    hours: '영업시간: 09:00 - 20:00',
    tags: ['영업중'],
    image: '/images/store_2.jpg',
    position: { lat: 37.29544017218779, lng: 126.83616599926162 }
  },
  {
    id: 3,
    name: '에리카마트',
    description: '대학가 맛집, 신선한 재료로 만든 음식',
    hours: '영업시간: 10:00 - 21:00',
    tags: ['대학가', '신선함', '인기'],
    image: 'https://via.placeholder.com/150x150/f59e0b/ffffff?text=Erica',
    position: { lat: 37.29844017218779, lng: 126.8371659992616 }
  },
  {
    id: 4,
    name: '로컬마트 에리카점',
    description: '지역 최고의 식재료 전문점',
    hours: '영업시간: 07:00 - 23:00',
    tags: ['24시간', '편의점', '생활용품'],
    image: 'https://via.placeholder.com/150x150/ef4444/ffffff?text=Local',
    position: { lat: 37.29444017218779, lng: 126.83316599926162 }
  },
  {
    id: 5,
    name: '그린마켓',
    description: '친환경 유기농 식품 전문',
    hours: '영업시간: 08:30 - 19:30',
    tags: ['유기농', '친환경', '건강식품'],
    image: 'https://via.placeholder.com/150x150/10b981/ffffff?text=Green',
    position: { lat: 37.29644017218779, lng: 126.83816599926162 }
  }
];

const MapPage: React.FC = () => {
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);
  const [restaurants, setRestaurants] = useState<typeof sampleRestaurants>([]);
  const [mapLevel, setMapLevel] = useState(3);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapCenter, setMapCenter] = useState(HANYANG_ERICA);

  // 컴포넌트 마운트 시 한 번만 데이터 로드
  useEffect(() => {
    // 나중에 실제 API 호출로 대체될 부분
    // const fetchRestaurants = async () => {
    //   try {
    //     const response = await axios.get('/api/restaurants');
    //     setRestaurants(response.data);
    //   } catch (error) {
    //     console.error('Failed to fetch restaurants:', error);
    //   }
    // };
    // fetchRestaurants();
    
    // 현재는 샘플 데이터 사용
    setRestaurants(sampleRestaurants);
  }, []);

  const handleMapClick = () => {
    if (isBottomSheetExpanded) {
      setIsBottomSheetExpanded(false);
    }
  };

  // 지도 확대
  const handleZoomIn = () => {
    setMapLevel(prev => Math.max(prev - 1, 1)); // 최소 레벨 1
  };

  // 지도 축소
  const handleZoomOut = () => {
    setMapLevel(prev => Math.min(prev + 1, 14)); // 최대 레벨 14
  };

  // 현재 위치로 이동
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { lat: latitude, lng: longitude };
          setCurrentLocation(newLocation);
          setMapCenter(newLocation);
        },
        (error) => {
          console.error('위치를 가져올 수 없습니다:', error);
          alert('위치 정보를 가져올 수 없습니다. 위치 서비스를 확인해주세요.');
        }
      );
    } else {
      alert('이 브라우저는 위치 서비스를 지원하지 않습니다.');
    }
  };

  return (
    <div className="page">
      <div className="page-content">
        {/* 카카오 지도 */}
        <Map
          center={mapCenter}
          style={{ width: "100%", height: "100%" }}
          level={mapLevel}
          onClick={handleMapClick}
        >
          <MapMarker position={HANYANG_ERICA}>
            <div style={{color:"#000"}}>한양대 에리카캠퍼스</div>
          </MapMarker>
          
          {/* 현재 위치 마커 */}
          {currentLocation && (
            <CustomOverlayMap position={currentLocation}>
              <div style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#10b981",
                borderRadius: "50%",
                border: "3px solid white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                transform: "translate(-50%, -50%)",
                position: "relative"
              }} />
            </CustomOverlayMap>
          )}
          
          {/* 식당 마커들 */}
          {restaurants.map((restaurant) => (
            <MapMarker
              key={restaurant.id}
              position={restaurant.position}
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

        {/* 지도 컨트롤 버튼들 */}
        <div className="map-controls">
          <button 
            className="map-control-btn"
            onClick={handleZoomIn}
            title="확대"
          >
            +
          </button>
          <button 
            className="map-control-btn"
            onClick={handleZoomOut}
            title="축소"
          >
            -
          </button>
          <button 
            className="map-control-btn location-btn"
            onClick={handleCurrentLocation}
            title="현재 위치"
          >
            📍
          </button>
        </div>

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
          restaurants={restaurants}
          isExpanded={isBottomSheetExpanded}
          onExpandedChange={setIsBottomSheetExpanded}
        />
      </div>
    </div>
  );
};

export default MapPage;
