import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    if (!hasCompletedOnboarding) {
      navigate('/onboarding');
    }
  }, [navigate]);

  return (
    <div className="page">
      <div className="page-content">
        <h1 className="page-title">홈 화면</h1>
      </div>
    </div>
  )
}

export default HomePage
