import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import './Onboarding.css';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);  // 현재 단계 index
  const [answers, setAnswers] = useState<Record<number, string[]>>({}); // 각 단계 선택값 저장
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태

  const totalSteps = steps.length;
  const currentStep = steps[step];

  const handleBackClick = () => {
    if (step === 0) {
      // 첫 번째 단계에서 백버튼 클릭 시 확인 창
      const shouldExit = window.confirm('정말 개인 기본 정보 입력을 그만두시겠어요?');
      if (shouldExit) {
        // 온보딩 미완료 상태로 설정
        localStorage.setItem('hasCompletedOnboarding', 'false');
        // 홈으로 이동 (또는 이전 페이지)
        navigate('/home');
      }
    } else {
      // 두 번째 이상 단계에서는 이전 단계로 이동
      setStep(step - 1);
    }
  };

  const toggleSelect = (option: string) => {
    const currentAnswers = answers[step] || [];
    
    // 선택 시 에러 메시지 초기화
    if (errorMessage) {
      setErrorMessage('');
    }

    // 단일 선택 스텝: 선택 변경 시 해당 옵션만 유지
    if ((currentStep as Step).singleSelect) {
      setAnswers({
        ...answers,
        [step]: [option],
      });
      return;
    }

    if (currentAnswers.includes(option)) {
      setAnswers({
        ...answers,
        [step]: currentAnswers.filter((item: string) => item !== option),
      });
    } else {
      setAnswers({
        ...answers,
        [step]: [...currentAnswers, option],
      });
    }
  };

  const nextStep = () => {
    const currentAnswers = answers[step] || [];
    
    // 선택된 옵션이 없으면 에러 메시지 표시
    if (currentAnswers.length === 0) {
      setErrorMessage('최소한 하나 이상 선택해 주세요.');
      return;
    }
    
    // 에러 메시지 초기화
    setErrorMessage('');
    
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      console.log("온보딩 완료!", answers);
      localStorage.setItem('hasCompletedOnboarding', 'true');
      navigate('/onboarding/finish');
    }
  };

  return (
    <div className="onboarding-page">
      {/* 헤더 */}
      <div className="onboarding-header">
        <button className="back-button" onClick={handleBackClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="onboarding-title">개인 기본 정보</h1>
      </div>

      {/* 프로그래스바 */}
      <div className="progress-section">
        <ProgressBar current={step + 1} total={totalSteps} />
      </div>

      {/* 콘텐츠 영역 */}
      <div className="onboarding-content">
        {/* 질문 */}
        <div className="question-section">
          <h2 className="question-title">{currentStep.title}</h2>
          <p className="question-subtitle">{currentStep.subText}</p>
        </div>

        {/* 옵션 버튼 */}
        <div className={`options-grid ${step >= 1 && step <= 3 ? 'preference-options' : ''}`}>
          {currentStep.options.map((option) => (
            <button
              key={option}
              onClick={() => toggleSelect(option)}
              className={`option-button ${answers[step]?.includes(option) ? 'selected' : ''}`}
            >
              {option}
            </button>
          ))}
        </div>
        
        {/* 에러 메시지 */}
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
      </div>

      {/* 다음 버튼 */}
      <div className="onboarding-footer">
        <button className="next-button" onClick={nextStep}>
          {step < totalSteps - 1 ? "다음 단계" : "완료"}
        </button>
      </div>
    </div>
  );
}

type Step = {
  title: string;
  subText: string;
  options: string[];
  singleSelect?: boolean;
};

const steps: Step[] = [
  {
    title: "선호하는 조리 스타일을 선택해주세요.",
    subText: "선호하는 조리 스타일은 중복 선택 가능해요.",
    options: ["구이", "볶음", "튀김", "찜", "생식", "오븐 구이", "국물, 탕", "기타"],
  },
  {
    title: "매운 음식 선호도를 선택해주세요.",
    subText: "매운 음식 선호도는 하나만 선택 가능해요.",
    options: ["매우 싫음", "약간 싫음", "보통", "약간 좋음", "매우 좋음"],
    singleSelect: true,
  },
  {
    title: "단 음식 선호도를 선택해주세요.",
    subText: "단 음식 선호도는 하나만 선택 가능해요.",
    options: ["매우 싫음", "약간 싫음", "보통", "약간 좋음", "매우 좋음"],
    singleSelect: true,
  },
  {
    title: "짠 음식 선호도를 선택해주세요.",
    subText: "짠 음식 선호도는 하나만 선택 가능해요.",
    options: ["매우 싫음", "약간 싫음", "보통", "약간 좋음", "매우 좋음"],
    singleSelect: true,
  },
  {
    title: "선호하는 조리 소요시간을 선택해주세요.",
    subText: "선호하는 조리 소요시간은 중복 선택 가능해요.",
    options: ["초간단(10분 이내)", "간단(10-30분)", "보통(30-60분)", "장시간(1-2시간)", "초장시간(2시간 이상)"],
  },
  {
    title: "새로운 음식에 도전하는 편인가요?",
    subText: "해당 항목은 하나만 선택 가능해요.",
    options: ["전혀 도전하지 않음", "도전하지 않는 편", "보통", "도전하는 편", "매우 도전함"],
    singleSelect: true,
  },
  {
    title: "종교적 이유로 피해야 할 음식이 있으신가요?",
    subText: "해당 항목은 중복 선택 가능해요.",
    options: ["돼지고기", "소고기", "닭고기", "해산물(어류)", "알코올(술,요리 포함)", "유제품/달걀", "특정 콩/곡물류", "없음"],
  },
];
