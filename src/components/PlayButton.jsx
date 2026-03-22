import styles from "@/components/PlayButton.module.css";
import Play from "@/icons/Play";
import Pause from "../icons/Pause";

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
