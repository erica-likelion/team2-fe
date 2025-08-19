export default function ProgressBar({ current, total }) {
    const progress = (current / total) * 100;
  
    return (
      <div style={styles.wrapper}>
        <div style={{ ...styles.bar, width: `${progress}%` }} />
      </div>
    );
  }
  
  const styles = {
    wrapper: {
      width: "375px",
      height: "4px",
      backgroundColor: "#0000000F",
      borderRadius: "2px",
      overflow: "hidden",
    },
    bar: {
      height: "100%",
      background: "linear-gradient(90deg, #56FFA1 0%, #2E8B57 100%)",
      transition: "width 0.3s ease",
    },
  };
  