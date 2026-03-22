import styles from "@/components/StopButton.module.css";
import Stop from "@/icons/Stop";

function StopButton({ stop }) {
  return (
    <button className={styles.stopButton} onClick={stop} aria-label="Stop">
      <Stop />
    </button>
  );
}

export default StopButton;
