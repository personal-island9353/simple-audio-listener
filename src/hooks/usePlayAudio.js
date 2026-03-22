import { useCallback, useEffect, useRef, useState } from "react";

function usePlayAudio(audioUrl) {
  const audio = useRef(new Audio(audioUrl));

  const [playing, setPlaying] = useState(false);
  const duration = useRef(null);
  const progressBar = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const onLoadedData = useCallback(() => {
    duration.current = audio.current.duration;
    console.log("Duration of the audio:", duration.current, "seconds");
    setTotalDuration(duration.current);
  }, []);

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
      const progress = (audio.current.currentTime / duration.current) * 100;
      progressBar.current.style.width = `${progress}%`;
      setCurrentTime(audio.current.currentTime || 0);
    }
  }, []);

  useEffect(() => {
    const currentAudio = audio.current;

    currentAudio.addEventListener("loadeddata", onLoadedData);
    currentAudio.addEventListener("ended", onEnded);
    currentAudio.addEventListener("pause", onPaused);
    currentAudio.addEventListener("play", onPlaying);
    currentAudio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      currentAudio.removeEventListener("loadeddata", onLoadedData);
      currentAudio.removeEventListener("ended", onEnded);
      currentAudio.removeEventListener("pause", onPaused);
      currentAudio.removeEventListener("play", onPlaying);
      currentAudio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [onLoadedData, onEnded, onPaused, onPlaying, onTimeUpdate]);

  const play = useCallback(() => {
    audio.current.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  }, []);

  const pause = useCallback(() => {
    audio.current.pause();
  }, []);

  const stop = useCallback(() => {
    audio.current.pause();
    audio.current.currentTime = 0;
    setCurrentTime(0);
  }, []);

  const setVolume = useCallback((volume) => {
    audio.current.volume = volume;
  }, []);

  const seek = useCallback((percentage) => {
    if (duration.current) {
      const newTime = percentage * duration.current;
      audio.current.currentTime = newTime;
    }
  }, []);

  const changeAudio = useCallback(
    (newUrl) => {
      const prev = audio.current;
      if (prev) {
        prev.pause();
        prev.removeEventListener("loadeddata", onLoadedData);
        prev.removeEventListener("ended", onEnded);
        prev.removeEventListener("pause", onPaused);
        prev.removeEventListener("play", onPlaying);
        prev.removeEventListener("timeupdate", onTimeUpdate);
      }

      const next = new Audio(newUrl);
      next.addEventListener("loadeddata", onLoadedData);
      next.addEventListener("ended", onEnded);
      next.addEventListener("pause", onPaused);
      next.addEventListener("play", onPlaying);
      next.addEventListener("timeupdate", onTimeUpdate);

      audio.current = next;
      setCurrentTime(0);
    },
    [onLoadedData, onEnded, onPaused, onPlaying, onTimeUpdate],
  );

  return {
    play,
    pause,
    stop,
    playing,
    progressBar,
    setVolume,
    seek,
    currentTime,
    duration: totalDuration,
    changeAudio,
  };
}

export default usePlayAudio;
