import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);  // 현재 단계 index
  const [answers, setAnswers] = useState<Record<number, string[]>>({}); // 각 단계 선택값 저장

  const totalSteps = steps.length;
  const currentStep = steps[step];

  const toggleSelect = (option: string) => {
    const currentAnswers = answers[step] || [];

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
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      console.log("온보딩 완료!", answers);
      localStorage.setItem('hasCompletedOnboarding', 'true');
      navigate('/onboarding/finish');
    }
  };

  return (
    <div style={styles.container}>
      {/* 프로그래스바 */}
      <ProgressBar current={step + 1} total={totalSteps} />

      {/* 질문 */}
      <div style={styles.question}>
        <h2 style={styles.title}>{currentStep.title}</h2>
        <p style={styles.subText}>{currentStep.subText}</p>
      </div>

      {/* 옵션 버튼 */}
      <div style={styles.options}>
        {currentStep.options.map((option) => (
          <button
            key={option}
            onClick={() => toggleSelect(option)}
            style={{
              ...styles.optionButton,
              ...(answers[step]?.includes(option) ? styles.optionSelected : {}),
            }}
          >
            {option}
          </button>
        ))}
      </div>

      {/* 다음 버튼 */}
      <div style={styles.footer}>
        <button style={styles.nextButton} onClick={nextStep}>
          {step < totalSteps - 1 ? "다음 단계" : "완료"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "375px",
    height: "812px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column" as const,
    backgroundColor: "#fff",
  },
  question: {
    padding: "5px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "700",
    fontStyle: "normal",
    lineHeight: "130%",
    letterSpacing: "-0.6px",
    marginBottom: "8px",
  },
  subText: {
    fontSize: "14px",
    color: "#666",
  },
  options: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  optionButton: {
    padding: "14px 16px",
    border: "1px solid #0000001F",
    borderRadius: "12px",
    background: "#00000008",
    fontSize: "14px",
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: "24px",
    letterSpacing: "-0.4px",
    cursor: "pointer",
  },
  optionSelected: {
    borderColor: "#2E8B57",
    borderWidth: "2px",
    fontWeight: "800",
    background: "#0000000D",
  },
  footer: {
    marginTop: "auto",
    padding: "20px",
  },
  nextButton: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "24px",
    backgroundColor: "#2E8B57",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0px 2px 6px #00000033",
  },
};

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
