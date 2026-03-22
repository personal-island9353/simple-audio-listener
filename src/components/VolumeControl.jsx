function VolumeControl({ setVolume }) {
  return (
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      onChange={(e) => setVolume(parseFloat(e.target.value))}
    />
  );
}

export default VolumeControl;
