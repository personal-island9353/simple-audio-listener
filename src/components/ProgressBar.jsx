import styles from "@/components/ProgressBar.module.css";
import { useCallback } from "react";

function ProgressBar({ progressBar, seek }) {
  const seekAudio = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const percentage = clickX / width;
      seek(percentage);
    },
    [seek],
  );

  return (
    <div className={styles.progressContainer} onClick={seekAudio}>
      <div className={styles.progressBar} ref={progressBar}></div>
    </div>
  );
}

export default ProgressBar;
