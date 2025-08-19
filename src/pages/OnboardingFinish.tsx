import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";

export default function OnboardingFinish() {
  const navigate = useNavigate();
  const totalSteps = 4;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <ProgressBar current={totalSteps} total={totalSteps} />
      <div style={styles.centerArea}>
        <div style={styles.messageBox}>
          <span style={styles.messageText}>조사완료!</span>
          <span style={styles.messageSubText}>고생하셨어요!</span>
        </div>
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
  centerArea: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  messageBox: {
    width: "272px",
    height: "144px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column" as const,
    backgroundColor: "transparent",
  },
  messageText: {
    fontSize: "72px",
    fontWeight: 700,
    color: "#000",
    lineHeight: "100%",
  },
  messageSubText: {
    fontSize: "40px",
    color: "#000",
    lineHeight: "100%",
    marginTop: "32px",
  },
};
