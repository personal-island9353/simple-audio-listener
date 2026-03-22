import styles from "@/components/PlayButton.module.css";
import Pause from "@/icons/Pause";
import Play from "@/icons/Play";

function PlayButton({ play, pause, playing }) {
  return (
    <button
      className={styles.playButton}
      onClick={playing ? pause : play}
      aria-label={playing ? "Pause" : "Play"}
    >
      {playing ? <Pause /> : <Play />}
    </button>
  );
}

export default PlayButton;
