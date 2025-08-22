import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import './Onboarding.css';
import './OnboardingFinish.css';

export default function OnboardingFinish() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); 
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="onboarding-finish-container">
      {/* 헤더 */}
      <div className="onboarding-header">
        <h1 className="onboarding-title">음식 성향 등록</h1>
      </div>
      <div className="progress-section">
        <ProgressBar current={totalSteps} total={totalSteps} />
      </div>
      <div className="onboarding-finish-center-area">
        <div className="onboarding-finish-message-box">
          <span className="onboarding-finish-message-text">조사 완료!</span>
          <span className="onboarding-finish-message-sub-text">고생하셨어요!</span>
        </div>
      </div>
    </div>
  );
}
