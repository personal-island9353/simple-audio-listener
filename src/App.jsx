import styles from "@/App.module.css";
import PlayButton from "@/components/PlayButton";
import ProgressBar from "@/components/ProgressBar";
import VolumeControl from "@/components/VolumeControl";
import usePlayAudio from "@/hooks/usePlayAudio";

function App() {
  const { play, pause, playing, progressBar, setVolume, seek } = usePlayAudio(
    "https://c230d4b3-f964-4b0a-a322-70bab20c258a.mdnplay.dev/shared-assets/audio/t-rex-roar.mp3",
  );

  return (
    <div className={styles.player}>
      <ProgressBar progressBar={progressBar} seek={seek} />
      <div className={styles.controls}>
        <PlayButton play={play} pause={pause} playing={playing} />
        <VolumeControl setVolume={setVolume} />
      </div>
    </div>
  );
}

export default App;
