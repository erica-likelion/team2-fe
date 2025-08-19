import { useState } from 'react';
// import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './HomePage.css'

const HomePage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('hot')

  const handlePreferenceRegistration = () => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding')
    
    if (hasCompletedOnboarding === 'true') {
      const shouldOverwrite = window.confirm('이미 등록되어 있어요!\n다시 등록하시겠어요?')
      if (shouldOverwrite) {
        navigate('/onboarding')
      }
    } else {
      navigate('/onboarding')
    }
  }
  
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    centerMode: true,
    variableWidth: false,

  }
  
  /*
  const navigate = useNavigate();

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    if (hasCompletedOnboarding != 'true') {
      navigate('/onboarding');
    }
  }, [navigate]);
  */

  const carouselItems = [
    {
      image: '/images/store_1.jpg',
      title: '2025년 신년 가을 특집',
      subtitle: '최신 트렌드 정보'
    },
    {
      image: '/images/store_2.jpg',
      title: '2025년 신년 가을 특집',
      subtitle: '최신 트렌드 정보'
    },
    {
      image: '/images/store_1.jpg',
      title: '2025년 신년 가을 특집',
      subtitle: '최신 트렌드 정보'
    },
    {
      image: '/images/store_2.jpg',
      title: '2025년 신년 가을 특집',
      subtitle: '최신 트렌드 정보'
    }
  ]

  const storeCategories = [
    { icon: '/icons/food/chinese.png', name: '중국 음식' },
    { icon: '/icons/food/japanese.png', name: '일본 음식' },
    { icon: '/icons/food/italy.png', name: '이탈리 음식' },
    { icon: '/icons/food/indian.png', name: '인도 음식' },
    { icon: '/icons/food/southeast_asian.png', name: '동남아 음식' },
    { icon: '/icons/food/french.svg', name: '프랑스 음식' },
    { icon: '/icons/food/south_american.svg', name: '남미 음식' },
    { icon: '/icons/food/american.svg', name: '북미 음식' },
    { icon: '/icons/food/alchol.svg', name: '세계 주류' },
    { icon: '/icons/food/tea_coffee.svg', name: '티/커피' }
  ]

  const hotStores = [
    {
      image: '/images/store_1.jpg',
      title: '프리미에트 코쿠리니',
      subtitle: '안산시 단원구 고잔동'
    },
    {
      image: '/images/store_2.jpg',
      title: '동우렌터미더 꾸역 터부 용',
      subtitle: '안산시 단원구 해양동'
    },
    {
      image: '/images/store_1.jpg',
      title: '스국러이아 다느',
      subtitle: '안산시 단원구 고잔동'
    },
    {
      image: '/images/store_2.jpg',
      title: '영률본스 그로서리 하우스',
      subtitle: '안산시 단원구 사동'
    },
    {
      image: '/images/store_1.jpg',
      title: '아시아 소국치어로',
      subtitle: '안산시 단원구 고잔동'
    },
    {
      image: '/images/store_2.jpg',
      title: '무형만드 멀티 이제드 아바 바이',
      subtitle: '안산시 단원구 해양동'
    }
  ]

  return (
    <div className="home-page">
      {/* 헤더 */}
      <div className="header">
        <div className="location">
          <span>중앙동</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
          </svg>
        </div>
        <div className="notification-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* 캐러셀 */}
      <div className="carousel-container">
        <Slider {...carouselSettings}>
          {carouselItems.map((item, index) => (
            <div key={index} className="carousel-item">
              <img src={item.image} alt={item.title} />
              <div className="carousel-overlay">
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* 자신의 음식 성향을 등록해 보세요 */}
      <div className="food-preference-section">
        <div className="section-header">
          <h3>자신의 음식 성향을<br />등록해 보세요!</h3>          
        </div>
        <button className="register-btn" onClick={handlePreferenceRegistration}>성향 등록하기</button>
      </div>

      {/* 음식 카테고리 그리드 */}
      <div className="category-grid">
        {storeCategories.map((category, index) => (
          <div key={index} className="category-item">
            <div className="category-icon">
              <img src={category.icon} alt={category.name} />
            </div>
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>

      {/* 가게 섹션 */}
      <div className="stores-section">
        <div className="section-title">
          <div className="tab-container">
            <button 
              className={`tab-button ${activeTab === 'hot' ? 'active' : ''}`}
              onClick={() => setActiveTab('hot')}
            >
              Hot한 가게
            </button>
            <button 
              className={`tab-button ${activeTab === 'nearby' ? 'active' : ''}`}
              onClick={() => setActiveTab('nearby')}
            >
              내 주변
            </button>
          </div>
          <div className="filter-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 6H20M4 12H16M4 18H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        
        {activeTab === 'hot' ? (
          <div className="stores-grid">
            {hotStores.map((store, index) => (
              <div key={index} className="store-item">
                <img src={store.image} alt={store.title} />
                <div className="store-info">
                  <h4>{store.title}</h4>
                  <p>{store.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="coming-soon">
            <p>준비중</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
