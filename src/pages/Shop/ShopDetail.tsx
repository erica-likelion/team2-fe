import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { getStoreById, type StoreData } from '../../constants/demoStores';
import { aiRecipeApi, groceryProductsApi, type Product } from '../../services/api';
import './ShopDetail.css';
import LocationIcon from '@/assets/icons/LocationMarkerOutline.svg';
import ClipboardIcon from '@/assets/icons/ClipboardListOutline.svg';
import HomeIcon from '@/assets/icons/HomeOutline.svg';
import sharebutton from '../../assets/icons/ShareOutline.svg'

export default function ShopDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(false);
  const [activeTab, setActiveTab] = useState('products'); // 판매 상품이 첫 번째 탭
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [productError, setProductError] = useState<string | null>(null);

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

  const handleAIRecipeRecommendation = async () => {
    if (isLoadingRecipe) return; // 이미 로딩 중이면 중복 요청 방지
    
    try {
      setIsLoadingRecipe(true);
      
      // RecipeWaiting 페이지로 이동
      navigate('/recipe-waiting');
      
      // AI 레시피 추천 API 호출
      const recipeResponse = await aiRecipeApi.recommendRecipes(restaurant.id, "none");
      
      // API 응답을 RecipeDetail 페이지로 전달하며 이동
      navigate('/recipe-detail', { 
        state: { 
          recipes: recipeResponse.recipes,
          storeInfo: restaurant 
        }
      });
      
    } catch (error) {
      console.error('AI 레시피 추천 요청 실패:', error);
      // 에러 발생 시 사용자에게 알리고 이전 페이지로 돌아감
      alert('레시피 추천 요청에 실패했습니다. 다시 시도해주세요.');
      navigate(-1);
    } finally {
      setIsLoadingRecipe(false);
    }
  };

  // 상품 목록 로드
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoadingProducts(true);
      setProductError(null);
      
      try {
        const response = await groceryProductsApi.getGroceryProducts(restaurant.id);
        setProducts(response.products);
      } catch (error) {
        console.error('상품 목록 로드 실패:', error);
        setProductError('상품 목록을 불러오는데 실패했습니다.');
        setProducts([]); // 빈 배열로 초기화
      } finally {
        setIsLoadingProducts(false);
      }
    };

    if (restaurant.id) {
      loadProducts();
    }
  }, [restaurant.id]);

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
          <button 
            className={`tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            판매 상품
          </button>
          <button 
            className={`tab ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            상세 정보
          </button>
          <button 
            className={`tab ${activeTab === 'location' ? 'active' : ''}`}
            onClick={() => setActiveTab('location')}
          >
            위치
          </button>
          <button 
            className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            후기
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'products' && (
            <div className="products-section">
              {isLoadingProducts ? (
                <div className="loading-message">상품 목록을 불러오는 중...</div>
              ) : productError ? (
                <div className="error-message">{productError}</div>
              ) : products.length > 0 ? (
                <div className="products-grid">
                  {products.map((product) => (
                    <div key={product.id} className="product-card">
                      <div className="product-image">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/150x150?text=No+Image';
                          }}
                        />
                      </div>
                      <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-products-message">등록된 상품이 없습니다.</div>
              )}
            </div>
          )}

          {activeTab === 'details' && (
            <div className="shop-description">
              {restaurant.description || '가게 설명이 준비되어 있지 않습니다.'}
            </div>
          )}

          {activeTab === 'location' && (
            <div className="location-section">
              <div className="location-info">
                <div className="address-info">
                  <h3>주소</h3>
                  <p>{restaurant.address || restaurant.description || '주소 정보 없음'}</p>
                </div>
                <div className="map-container">
                  <Map
                    center={{
                      lat: restaurant.position.lat,
                      lng: restaurant.position.lng,
                    }}
                    style={{
                      width: "100%",
                      height: "200px",
                      borderRadius: "8px"
                    }}
                    level={3}
                    draggable={false}
                    scrollwheel={false}
                    keyboardShortcuts={false}
                  >
                    <MapMarker
                      position={{
                        lat: restaurant.position.lat,
                        lng: restaurant.position.lng,
                      }}
                      title={restaurant.name}
                    />
                  </Map>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="reviews-section">
              <p>현재 준비 중입니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom Action */}
      <div className="shop-footer">
        <button 
          className="recommend-button" 
          onClick={handleAIRecipeRecommendation}
          disabled={isLoadingRecipe}
        >
          <span className="recommend-label">
            {isLoadingRecipe ? '레시피 준비 중...' : 'AI에게 레시피 추천받기'}
          </span>
        </button>
      </div>
    </div>
  );
}
