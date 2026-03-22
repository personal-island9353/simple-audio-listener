import "@/App.css";
import usePlayAudio from "@/hooks/usePlayAudio";
import Pause from "@/icons/Pause";
import Play from "@/icons/Play";

function App() {
  const { play, pause, playing, progressBar } = usePlayAudio(
    "https://c230d4b3-f964-4b0a-a322-70bab20c258a.mdnplay.dev/shared-assets/audio/t-rex-roar.mp3",
  );

  return (
    <>
      <div className="progress-container">
        <div className="progress-bar" ref={progressBar}></div>
      </div>
      <button
        className={`play-button ${playing ? "hidden" : ""}`}
        onClick={play}
        aria-label="Play"
      >
        <Play />
      </button>
      <button
        className={`pause-button ${playing ? "" : "hidden"}`}
        onClick={pause}
        aria-label="Pause"
      >
        <Pause />
      </button>
    </>
  );
}

export default App;
