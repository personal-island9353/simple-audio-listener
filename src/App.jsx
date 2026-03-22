import "@/App.css";
import usePlayAudio from "@/hooks/usePlayAudio";
import PlayButton from "./components/PlayButton";
import ProgressBar from "./components/ProgressBar";

function App() {
  const { play, pause, playing, progressBar } = usePlayAudio(
    "https://c230d4b3-f964-4b0a-a322-70bab20c258a.mdnplay.dev/shared-assets/audio/t-rex-roar.mp3",
  );

  return (
    <>
      <ProgressBar progressBar={progressBar} />
      <PlayButton play={play} pause={pause} playing={playing} />
    </>
  );
}

export default App;
