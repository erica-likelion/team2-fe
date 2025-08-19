import React, { useState, useEffect, useRef } from 'react';
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';
import SearchBar from '../components/SearchBar';
import BottomSheet, { type BottomSheetRef } from '../components/BottomSheet';
import './MapPage.css';
import store1 from '../assets/images/store_1.jpg';
import store2 from '../assets/images/store_2.jpg';

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
    image: store1,
    position: { lat: 37.29744017218779, lng: 126.8341659992616 }
  },
  {
    id: 2,
    name: '스프라마트 다노',
    description: '안산시 상록구 서론',
    hours: '영업시간: 09:00 - 20:00',
    tags: ['영업중'],
    image: store2,
    position: { lat: 37.29544017218779, lng: 126.83616599926162 }
  },
  {
    id: 3,
    name: '에리카마트',
    description: '대학가 맛집, 신선한 재료로 만든 음식',
    hours: '영업시간: 10:00 - 21:00',
    tags: ['대학가', '신선함', '인기'],
    image: store1,
    position: { lat: 37.29844017218779, lng: 126.8371659992616 }
  },
  {
    id: 4,
    name: '로컬마트 에리카점',
    description: '지역 최고의 식재료 전문점',
    hours: '영업시간: 07:00 - 23:00',
    tags: ['24시간', '편의점', '생활용품'],
    image: store2,
    position: { lat: 37.29444017218779, lng: 126.83316599926162 }
  },
  {
    id: 5,
    name: '그린마켓',
    description: '친환경 유기농 식품 전문',
    hours: '영업시간: 08:30 - 19:30',
    tags: ['유기농', '친환경', '건강식품'],
    image: store1,
    position: { lat: 37.29644017218779, lng: 126.83816599926162 }
  }
];

const MapPage: React.FC = () => {
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);
  const [restaurants, setRestaurants] = useState<typeof sampleRestaurants>([]);
  const [mapLevel, setMapLevel] = useState(3);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapCenter, setMapCenter] = useState(HANYANG_ERICA);
  const bottomSheetRef = useRef<BottomSheetRef>(null);

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

  // 지도 레벨 변화 감지 핸들러 (스크롤, 더블탭 등)
  const handleZoomChanged = (map: kakao.maps.Map) => {
    const currentLevel = map.getLevel();
    setMapLevel(currentLevel);
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

  // 식당 마커 클릭 핸들러
  const handleMarkerClick = (restaurantId: number) => {
    // 클릭된 식당 찾기
    const selectedRestaurant = restaurants.find(r => r.id === restaurantId);
    if (!selectedRestaurant) return;

    // 바텀시트를 확장하고
    setIsBottomSheetExpanded(true);
    
    // 줌 레벨을 고정값으로 설정 (3: 적당한 확대 수준)
    const targetZoomLevel = 3;
    setMapLevel(targetZoomLevel);
    
    // 지도 중심을 조정된 위치로 이동
    // 바텀시트가 차지하는 공간만큼 지도 중심을 위쪽으로 이동
    // 한국 지역에서 위도 0.001도는 대략 111m 정도
    const latOffset = 0.0017; // 바텀시트 공간을 고려한 위쪽 오프셋
    
    const adjustedPosition = {
      lat: selectedRestaurant.position.lat - latOffset,
      lng: selectedRestaurant.position.lng
    };
    
    setTimeout(() => {
      setMapCenter(adjustedPosition);
    }, 100);

    // 해당 식당으로 스크롤
    setTimeout(() => {
      bottomSheetRef.current?.scrollToRestaurant(restaurantId);
    }, 300); // 바텀시트가 확장된 후 스크롤하기 위한 딜레이
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
          onZoomChanged={handleZoomChanged}
        >
          <CustomOverlayMap position={HANYANG_ERICA}>
            <div style={{ position: 'relative' }}>
              {/* 위치 핀 (동그라미) */}
              <div style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#6b7280",
                borderRadius: "50%",
                border: "3px solid white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                position: "absolute",
                top: "0",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 2
              }} />
              
              {/* 말풍선 라벨 */}
              <div style={{
                padding: "8px 12px",
                backgroundColor: "#ffffff",
                color: "#1f2937",
                fontSize: "13px",
                fontWeight: "600",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                border: "1px solid #e5e7eb",
                whiteSpace: "nowrap",
                textAlign: "center",
                position: "absolute",
                top: "-45px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1
              }}>
                한양대 에리카캠퍼스
                {/* 말풍선 꼬리 */}
                <div style={{
                  position: "absolute",
                  bottom: "-6px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "0",
                  height: "0",
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: "6px solid #ffffff"
                }} />
              </div>
            </div>
          </CustomOverlayMap>
          
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
            <CustomOverlayMap
              key={restaurant.id}
              position={restaurant.position}
            >
              <div style={{ position: 'relative' }}>
                {/* 위치 핀 (동그라미) */}
                <div style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#10b981",
                  borderRadius: "50%",
                  border: "3px solid white",
                  boxShadow: "0 2px 8px rgba(16, 185, 129, 0.4)",
                  position: "absolute",
                  top: "0",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 2,
                  cursor: "pointer"
                }}
                onClick={() => handleMarkerClick(restaurant.id)} />
                
                {/* 말풍선 라벨 */}
                <div 
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#10b981",
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: "500",
                    borderRadius: "10px",
                    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                    position: "absolute",
                    top: "-50px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    border: "2px solid #ffffff",
                    zIndex: 1
                  }}
                  onClick={() => handleMarkerClick(restaurant.id)}
                >
                  {restaurant.name}
                  {/* 말풍선 꼬리 */}
                  <div style={{
                    position: "absolute",
                    bottom: "-8px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "16px",
                    height: "8px",
                    overflow: "hidden"
                  }}>
                    <div style={{
                      position: "absolute",
                      top: "-6px",
                      left: "50%",
                      transform: "translateX(-50%) rotate(45deg)",
                      width: "12px",
                      height: "12px",
                      backgroundColor: "#10b981",
                      border: "2px solid #ffffff",
                      borderTop: "none",
                      borderLeft: "none"
                    }} />
                  </div>
                </div>
              </div>
            </CustomOverlayMap>
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
          ref={bottomSheetRef}
          restaurants={restaurants}
          isExpanded={isBottomSheetExpanded}
          onExpandedChange={setIsBottomSheetExpanded}
        />
      </div>
    </div>
  );
};

export default MapPage;
