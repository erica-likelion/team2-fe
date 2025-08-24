import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { completeOnboarding } from "../../services/preferencesManager";
import ProgressBar from "../../components/ProgressBar";
import OnboardingImage from "../../assets/icons/onboardingimg.svg";
import './Onboarding.css';
import './OnboardingFinish.css';

export default function OnboardingFinish() {
  const navigate = useNavigate();
  const [isCompleting, setIsCompleting] = useState(false);

  useEffect(() => {
    const finishOnboarding = async () => {
      setIsCompleting(true);
      
      try {
        // 온보딩 데이터를 선호도로 변환하여 저장
        await completeOnboarding();
        console.log('Onboarding completed successfully');
        
        // 온보딩 완료 상태를 로컬스토리지에 저장
        localStorage.setItem('hasCompletedOnboarding', 'true');
        
        // 2초 후 홈으로 이동
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } catch (error) {
        console.error('Failed to complete onboarding:', error);
        // 실패해도 온보딩은 완료된 것으로 처리
        localStorage.setItem('hasCompletedOnboarding', 'true');
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    };

    finishOnboarding();
  }, [navigate]);

  const totalSteps = 3; // 온보딩 총 단계 수

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
        <div className="onboarding-finish-content">
          <div className="onboarding-finish-image-container">
            <img 
              src={OnboardingImage} 
              alt="온보딩 완료" 
              className="onboarding-finish-image"
            />
          </div>
          <div className="onboarding-finish-message-box">
            <span className="onboarding-finish-message-text">
              {isCompleting ? '데이터 저장 중...' : '조사 완료!'}
            </span>
            <span className="onboarding-finish-message-sub-text">
              {isCompleting ? '잠시만 기다려주세요' : '고생하셨어요!'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
