const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const oscillatorMap = {};

function playSynthSound(note) {
  const oscillator = audioContext.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(
    getFrequency(note),
    audioContext.currentTime
  );

  oscillator.connect(audioContext.destination);
  oscillator.start();

  oscillatorMap[note] = oscillator;
}

function stopSynthSound(note) {
  if (oscillatorMap[note]) {
    oscillatorMap[note].stop();
    delete oscillatorMap[note];
  }
}

function getFrequency(note) {
  const frequencies = {
    F_Sharp_High: 92.5,
    G_Sharp_High: 103.83,
    A_Sharp_High: 116.54,
    C_Sharp_High: 138.59,
    D_Sharp_High: 155.56,
    F_Sharp_Low: 185.0,
    G_Sharp_Low: 207.65,
    A_Sharp_Low: 233.08,
    C_Sharp_Low: 277.18,
    D_Sharp_Low: 311.13,
    F_High: 87.31,
    G_High: 98.0,
    A_High: 110.0,
    B_High: 123.47,
    C_High: 130.81,
    D_High: 146.83,
    E_High: 164.81,
    F_Low: 174.61,
    G_Low: 196.0,
    A_Low: 220.0,
    B_Low: 246.94,
    C_Low: 261.63,
    D_Low: 293.66,
    E_Low: 329.63,
  };
  return frequencies[note] || 0;
}

const buttons = document.querySelectorAll(".button--long");
buttons.forEach((button) => {
  const note = button.id;
  button.addEventListener("mousedown", () => playSynthSound(note));
  button.addEventListener("mouseup", () => stopSynthSound(note));
  button.addEventListener("mouseleave", () => stopSynthSound(note));
  button.addEventListener("touchstart", () => playSynthSound(note));
  button.addEventListener("touchend", () => stopSynthSound(note));
});

const blackButtons = document.querySelectorAll(".button--blackKeys");
blackButtons.forEach((button) => {
  const note = button.id;
  button.addEventListener("mousedown", () => playSynthSound(note));
  button.addEventListener("mouseup", () => stopSynthSound(note));
  button.addEventListener("mouseleave", () => stopSynthSound(note));
  button.addEventListener("touchstart", () => playSynthSound(note));
  button.addEventListener("touchend", () => stopSynthSound(note));
});
