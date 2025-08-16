import './LandingPage.css'

interface LandingPageProps {
  onStart: () => void
}

const LandingPage = ({ onStart }: LandingPageProps) => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="welcome-section">
          <h1 className="welcome-text">Welcome</h1>
        </div>
        <div className="start-section">
          <button className="start-button" onClick={onStart}>
            시작하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
