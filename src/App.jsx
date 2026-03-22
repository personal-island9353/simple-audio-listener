import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import Pause from "./icons/Pause";
import Play from "./icons/Play";

function App() {
  const trexRoar = useMemo(
    () =>
      new Audio(
        "https://c230d4b3-f964-4b0a-a322-70bab20c258a.mdnplay.dev/shared-assets/audio/t-rex-roar.mp3",
      ),
    [],
  );

  const [play, setPlay] = useState(false);
  const duration = useRef(null);
  const progressBar = useRef(null);

  const loadedData = useCallback(() => {
    duration.current = trexRoar.duration;
    console.log("Duration of the audio:", duration.current, "seconds");
  }, [trexRoar]);

  const ended = useCallback(() => {
    setPlay(false);
    console.log("Audio has ended");
  }, []);

  const paused = useCallback(() => {
    setPlay(false);
    console.log("Audio is paused");
  }, []);

  const playing = useCallback(() => {
    setPlay(true);
    console.log("Audio is playing");
  }, []);

  const timeUpdate = useCallback(() => {
    if (duration.current) {
      const progress = (trexRoar.currentTime / duration.current) * 100;
      progressBar.current.style.width = `${progress}%`;
    }
  }, [trexRoar]);

  useEffect(() => {
    trexRoar.addEventListener("loadeddata", loadedData);
    trexRoar.addEventListener("ended", ended);
    trexRoar.addEventListener("pause", paused);
    trexRoar.addEventListener("play", playing);
    trexRoar.addEventListener("timeupdate", timeUpdate);

    return () => {
      trexRoar.removeEventListener("loadeddata", loadedData);
      trexRoar.removeEventListener("ended", ended);
      trexRoar.removeEventListener("pause", paused);
      trexRoar.removeEventListener("play", playing);
      trexRoar.removeEventListener("timeupdate", timeUpdate);
    };
  }, [trexRoar, loadedData, ended, paused, playing, timeUpdate]);

  const onPlay = useCallback(() => {
    trexRoar.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  }, [trexRoar]);

  const onPause = useCallback(() => {
    trexRoar.pause();
  }, [trexRoar]);

  return (
    <>
      <div className="progress-container">
        <div className="progress-bar" ref={progressBar}></div>
      </div>
      <button
        className={`play-button ${play ? "hidden" : ""}`}
        onClick={onPlay}
        aria-label="Play"
      >
        <Play />
      </button>
      <button
        className={`pause-button ${play ? "" : "hidden"}`}
        onClick={onPause}
        aria-label="Pause"
      >
        <Pause />
      </button>
    </>
  );
}

export default App;
