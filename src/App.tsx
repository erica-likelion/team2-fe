import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import SplashScreen from './components/SplashScreen'
import LandingPage from './components/LandingPage'
import Onboarding from './pages/Onboarding'
import HomePage from './pages/HomePage'
import MapPage from './pages/MapPage'
import MenuPage from './pages/MenuPage'
import UserPage from './pages/UserPage'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    // 스플래시 화면 1초 표시
    const splashTimer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(splashTimer)
  }, [])

  if (isLoading) {
    return <SplashScreen />
  }

  // 랜딩 또는 온보딩 페이지일 때는 네비바 없이 렌더링
  if (location.pathname === '/' || location.pathname === '/onboarding') {
    return (
      <div className="app">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/onboarding" element={<Onboarding />} />
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

export default App
