import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import './ShopDetail.css';
import LocationIcon from '@/assets/icons/LocationMarkerOutline.svg';
import ClipboardIcon from '@/assets/icons/ClipboardListOutline.svg';
import HomeIcon from '@/assets/icons/HomeOutline.svg';
import sharebutton from '../assets/icons/ShareOutline.svg'

type Restaurant = {
  id: number;
  name: string;
  description?: string;
  hours?: string;
  tags?: string[];
  image?: string;
  address?: string;
  likes?: number;
};

export default function ShopDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const restaurant = useMemo<Restaurant>(() => {
    const state = (location.state as { restaurant?: Restaurant })?.restaurant;
    if (state) return state;
    // Fallback when directly accessing URL without state
    return {
      id: Number(params.id),
      name: '가게 정보',
      description: '선택한 가게 상세 정보',
      hours: '09:00 ~ 20:00',
      tags: ['정보없음'],
      image: '/images/store_1.jpg',
      address: '주소 정보 없음',
      likes: 0,
    };
  }, [location.state, params.id]);

  const convertToEnglish = (koreanName: string): string => {
    const nameMap: { [key: string]: string } = {
      '영플렉스 그로서리 하우스': 'Youngplex Grocery House',
      '스프라마트 다노': 'Supermarket Dano',
      '에리카마트': 'Erica Mart',
      '로컬마트 에리카점': 'Local Mart Erica',
      '그린마켓': 'Green Market',
      '스쿠데리아 디노': 'Scuderia Dino',
      '가게 정보': 'Store Information',
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
            <span>{restaurant.address || '주소 정보 없음'}</span>
          </div>
          <div className="info-row">
            <img src={HomeIcon} className="row-icon" alt="likes" />
            <span>즐겨찾기한 사람 {restaurant.likes ?? 0}명</span>
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
