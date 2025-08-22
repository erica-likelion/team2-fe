import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import SplashScreen from './components/SplashScreen'
import LandingPage from './pages/LandingPage'
import Onboarding from './pages/Onboarding'
import OnboardingFinish from './pages/OnboardingFinish'
import HomePage from './pages/HomePage'
import MapPage from './pages/MapPage'
import MenuPage from './pages/MenuPage'
import UserPage from './pages/UserPage'
import ShopDetail from './pages/ShopDetail'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [nextPageReady, setNextPageReady] = useState(false)
  const location = useLocation()
  
  // 온보딩 완료 여부 확인
  const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true'

  useEffect(() => {
    // 스플래시 화면이 표시되는 동안 다음 페이지를 미리 준비
    setNextPageReady(true)

    // 스플래시 화면 1초 표시 후 페이드아웃 시작
    const splashTimer = setTimeout(() => {
      setIsFadingOut(true)
      // 페이드아웃 완료 후 스플래시 제거
      setTimeout(() => {
        setIsLoading(false)
      }, 500) // 0.5초 페이드아웃 시간
    }, 1000)

    return () => clearTimeout(splashTimer)
  }, [])

  // 스플래시 화면이 보이는 동안에는 동시에 다음 페이지도 준비
  if (isLoading) {
    return (
      <div className="app-container" style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <SplashScreen fadeOut={isFadingOut} />
        {nextPageReady && (
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            opacity: isFadingOut ? 1 : 0,
            transition: 'opacity 0.5s ease-in',
            zIndex: isFadingOut ? 9998 : -1
          }}>
            {renderAppContent()}
          </div>
        )}
      </div>
    )
  }

  return renderAppContent();

  // 앱 콘텐츠 렌더링 함수
  function renderAppContent() {
    // 랜딩 또는 온보딩 페이지일 때는 네비바 없이 렌더링
    if (location.pathname === '/' || location.pathname.startsWith('/onboarding')) {
      return (
        <div className="app">
          <main className="main-content">
            <Routes>
              <Route path="/" element={
                hasCompletedOnboarding ? <Navigate to="/home" replace /> : <LandingPage />
              } />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/onboarding/finish" element={<OnboardingFinish />} />
            </Routes>
          </main>
        </div>
      )
    }

    // 일반 페이지들 (네비바 포함)
    return (
      <div className="app">
        <main className="main-content">
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/user" element={<UserPage />} />
          </Routes>
        </main>
        <Navbar />
      </div>
    )
  }
}

export default App
