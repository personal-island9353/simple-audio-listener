import styles from "@/App.module.css";
import AudioInput from "@/components/AudioInput";
import PlayButton from "@/components/PlayButton";
import ProgressBar from "@/components/ProgressBar";
import StopButton from "@/components/StopButton";
import VolumeControl from "@/components/VolumeControl";
import usePlayAudio from "@/hooks/usePlayAudio";
import formatTime from "@/utils/formatTime";
import { useEffect, useState } from "react";

function App() {
  const [audio, setAudio] = useState(
    "https://c230d4b3-f964-4b0a-a322-70bab20c258a.mdnplay.dev/shared-assets/audio/t-rex-roar.mp3",
  );

  const {
    play,
    pause,
    stop,
    playing,
    progressBar,
    setVolume,
    seek,
    currentTime,
    duration,
    changeAudio,
  } = usePlayAudio(audio);

  useEffect(() => {
    changeAudio(audio);
  }, [audio, changeAudio]);

  return (
    <div className={styles.player}>
      <AudioInput audio={audio} setAudio={setAudio} />
      <ProgressBar progressBar={progressBar} seek={seek} />
      <div className={styles.controls}>
        <PlayButton play={play} pause={pause} playing={playing} />
        <StopButton stop={stop} />
        <VolumeControl setVolume={setVolume} />
        <div className={styles.time}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  );
}

export default App;
