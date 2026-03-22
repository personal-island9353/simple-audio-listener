import styles from "@/components/ProgressBar.module.css";

function ProgressBar({ progressBar }) {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar} ref={progressBar}></div>
    </div>
  );
}

export default ProgressBar;
