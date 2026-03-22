import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function usePlayAudio(audioUrl) {
  const audio = useMemo(() => new Audio(audioUrl), [audioUrl]);

  const [playing, setPlaying] = useState(false);
  const duration = useRef(null);
  const progressBar = useRef(null);

  const onLoadedData = useCallback(() => {
    duration.current = audio.duration;
    console.log("Duration of the audio:", duration.current, "seconds");
  }, [audio]);

  const onEnded = useCallback(() => {
    setPlaying(false);
    console.log("Audio has ended");
  }, []);

  const onPaused = useCallback(() => {
    setPlaying(false);
    console.log("Audio is paused");
  }, []);

  const onPlaying = useCallback(() => {
    setPlaying(true);
    console.log("Audio is playing");
  }, []);

  const onTimeUpdate = useCallback(() => {
    if (duration.current) {
      const progress = (audio.currentTime / duration.current) * 100;
      progressBar.current.style.width = `${progress}%`;
    }
  }, [audio]);

  useEffect(() => {
    audio.addEventListener("loadeddata", onLoadedData);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("pause", onPaused);
    audio.addEventListener("play", onPlaying);
    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.removeEventListener("loadeddata", onLoadedData);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("pause", onPaused);
      audio.removeEventListener("play", onPlaying);
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [audio, onLoadedData, onEnded, onPaused, onPlaying, onTimeUpdate]);

  const play = useCallback(() => {
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  }, [audio]);

  const pause = useCallback(() => {
    audio.pause();
  }, [audio]);

  return { play, pause, playing, progressBar };
}

export default usePlayAudio;
