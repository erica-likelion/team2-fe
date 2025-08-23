import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import SplashScreen from './components/SplashScreen'
import LandingPage from './components/LandingPage'
import HomePage from './pages/HomePage'
import MapPage from './pages/MapPage'
import MenuPage from './pages/MenuPage'
import RecipeWaiting from './pages/RecipeWaiting'
import UserPage from './pages/UserPage'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showLanding, setShowLanding] = useState(false)

  useEffect(() => {
    const isFirstTime = !localStorage.getItem('isItFirst')
    
    // 스플래시 화면 1초 표시
    const splashTimer = setTimeout(() => {
      setIsLoading(false)
      if (isFirstTime) {
        setShowLanding(true)
      }
    }, 1000)

    return () => clearTimeout(splashTimer)
  }, [])

  const handleStartApp = () => {
    localStorage.setItem('isItFirst', 'false')
    setShowLanding(false)
  }

  if (isLoading) {
    return <SplashScreen />
  }

  if (showLanding) {
    return <LandingPage onStart={handleStartApp} />
  }

  return (
    <div className="app">
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/recipe-waiting" element={<RecipeWaiting />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </main>
      <Navbar />
    </div>
  )
}

export default App
