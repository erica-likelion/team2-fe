import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

const LandingPage = () => {
  const navigate = useNavigate()

  const handleStartClick = () => {
    // 온보딩 페이지로 이동
    navigate('/onboarding')
  }

  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="welcome-section">
          <h1 className="welcome-text">환영합니다!</h1>
        </div>
        <div className="start-section">
          <button className="start-button" onClick={handleStartClick}>
            음식 성향 설정하기
          </button>     
          <button className="later-button" onClick={() => navigate('/home')}>
            다음에 할게요
          </button>        
        </div>
      </div>
    </div>
  )
}

export default LandingPage
