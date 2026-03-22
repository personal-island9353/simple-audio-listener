import styles from "@/components/AudioInput.module.css";

function AudioInput({ audio, setAudio }) {
  return (
    <>
      <label htmlFor="audioInput" className={styles.audioLabel}>
        Audio URL:
      </label>
      <input
        id="audioInput"
        className={styles.audioInput}
        type="text"
        value={audio}
        onChange={(e) => setAudio(e.target.value)}
      />
    </>
  );
}

export default AudioInput;
