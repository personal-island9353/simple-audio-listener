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

  const setVolume = useCallback((volume) => {
    audio.current.volume = volume;
  }, []);

  const seek = useCallback((percentage) => {
    if (duration.current) {
      const newTime = percentage * duration.current;
      audio.current.currentTime = newTime;
    }
  }, []);

  return {
    play,
    pause,
    playing,
    progressBar,
    setVolume,
    seek,
    currentTime,
    duration: totalDuration,
  };
}

export default usePlayAudio;
