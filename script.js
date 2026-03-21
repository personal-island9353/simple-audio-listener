const trexRoar = new Audio(
  "https://c230d4b3-f964-4b0a-a322-70bab20c258a.mdnplay.dev/shared-assets/audio/t-rex-roar.mp3",
);

const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");

let duration;
trexRoar.addEventListener("loadeddata", () => {
  duration = trexRoar.duration;
  console.log("Duration of the audio:", duration, "seconds");
});

trexRoar.addEventListener("ended", () => {
  console.log("Audio has ended");
  playButton.classList.remove("hidden");
  pauseButton.classList.add("hidden");
  trexRoar.currentTime = 0;
});

trexRoar.addEventListener("pause", () => {
  console.log("Audio is paused");
});

trexRoar.addEventListener("play", () => {
  console.log("Audio is playing");
});

playButton.addEventListener("click", () => {
  playButton.classList.add("hidden");
  pauseButton.classList.remove("hidden");
  trexRoar.play().catch((error) => {
    console.error("Error playing audio:", error);
  });
});

pauseButton.addEventListener("click", () => {
  playButton.classList.remove("hidden");
  pauseButton.classList.add("hidden");
  trexRoar.pause();
});

setInterval(() => {
  console.log("Current time of the audio:", trexRoar.currentTime, "seconds");
}, 1_000);
