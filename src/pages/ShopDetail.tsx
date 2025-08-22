import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { getStoreById, type StoreData } from '../constants/demoStores';
import './ShopDetail.css';
import LocationIcon from '@/assets/icons/LocationMarkerOutline.svg';
import ClipboardIcon from '@/assets/icons/ClipboardListOutline.svg';
import HomeIcon from '@/assets/icons/HomeOutline.svg';
import sharebutton from '../assets/icons/ShareOutline.svg'

export default function ShopDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const restaurant = useMemo<StoreData>(() => {
    const state = (location.state as { restaurant?: StoreData })?.restaurant;
    if (state) return state;
    
    // URL 파라미터로 직접 접근할 때 ID로 데이터 가져오기
    const storeId = Number(params.id);
    const store = getStoreById(storeId);
    if (store) return store;
    
    // Fallback when no data found
    return {
      id: storeId || 1,
      name: '가게 정보를 찾을 수 없습니다',
      description: '선택한 가게 상세 정보',
      hours: '영업시간: 09:00 - 20:00',
      tags: ['정보없음'],
      image: '../assets/images/stores/1.webp',
      position: { lat: 37.2975, lng: 126.8373 },
      address: '주소 정보 없음',
    };
  }, [location.state, params.id]);

  const convertToEnglish = (koreanName: string): string => {
    const nameMap: { [key: string]: string } = {
      '아시아 마트': 'Asia Mart',
      '월드 푸드': 'World Food',
      '사마르칸트': 'Samarkand',
      '베트남 식료품': 'Vietnam Grocery',
      '할랄 미트 & 식료품': 'Halal Meat & Grocery',
      '러시안 마켓': 'Russian Market',
      '중국 식품점': 'Chinese Food Store',
      '인도 향신료 가게': 'Indian Spice Shop',
      '필리핀 스토어': 'Philippine Store',
      '타코 재료점': 'Taco Ingredients Store',
      '가게 정보를 찾을 수 없습니다': 'Store Information Not Found',
    };
    
    return nameMap[koreanName] || koreanName;
  };

  const handleBack = () => navigate(-1);
  const handleOrder = () => {
    navigate('/menu');
  };

  return (
    <div className="shop-page">
      {/* Header */}
      <header className="shop-header">
                <button className="icon-button" onClick={handleBack} aria-label="뒤로가기">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            </svg>
            </button>
        <div className="header-actions">
          <button className="sharebutton" aria-label="공유">
          <img src={sharebutton} alt="sharebutton" />
          </button>
          <button className="icon-button" aria-label="즐겨찾기">♡</button>
        </div>
      </header>

      {/* Photo */}
      <div className="shop-photo">
        {restaurant.image ? (
          <img src={restaurant.image} alt={restaurant.name} />
        ) : (
          <div className="photo-fallback">No Image</div>
        )}
      </div>

      {/* Info */}
      <section className="shop-info">
        <div className="shop-title">
          <h1 className="ko">{restaurant.name}</h1>
          <h2 className="en">{convertToEnglish(restaurant.name)}</h2>
        </div>

        {restaurant.tags && restaurant.tags.length > 0 && (
          <div className="tag-list">
            {restaurant.tags.map((tag, idx) => (
              <span key={idx} className="tag">{tag}</span>
            ))}
          </div>
        )}

        <div className="tag-separator"></div>

        <div className="info-rows">
          <div className="info-row">
            <img src={ClipboardIcon} className="row-icon" alt="hours" />
            <span>{restaurant.hours || '영업시간 정보 없음'}</span>
          </div>
          <div className="info-row">
            <img src={LocationIcon} className="row-icon" alt="address" />
            <span>{restaurant.address || restaurant.description || '주소 정보 없음'}</span>
          </div>
          <div className="info-row">
            <img src={HomeIcon} className="row-icon" alt="rating" />
            <span>평점 정보 준비 중</span>
          </div>
        </div>

        <div className="tabs">
          <button className="tab active">상세 정보</button>
          <button className="tab">위치</button>
          <button className="tab">후기</button>
        </div>

        <div className="shop-description">
          {restaurant.description || '가게 설명이 준비되어 있지 않습니다.'}
        </div>
      </section>

      {/* Bottom Action */}
      <div className="shop-footer">
        <button className="recommend-button" onClick={handleOrder}><span className="recommend-label">AI에게 레시피 추천받기</span></button>
      </div>
    </div>
  );
}
