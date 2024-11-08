const texts = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing speed tests are great way to improve your skills.",
  "Practice typing to increase accuracy and speed.",
];
const textDisplay = document.getElementById("text-display");
const textInput = document.getElementById("text-input");
const startButton = document.getElementById("start-btn");
const timeDisplay = document.getElementById("time-display");
const wpmDisplay = document.getElementById("wpn-display");
const accuracyDisplay = document.getElementById("accuracy-display");

let startTime;
let interval;

function startTest() {
  //reset the values
  textInput.value = "";
  timeDisplay.textContent = "0";
  wpmDisplay.textContent = "0";
  accuracyDisplay.textContent = "0";

  //select a random text
  const randomText = texts[Math.floor(Math.random() * texts.length)];
  textDisplay.textContent = randomText;

  //start timing
  startTime = new Date().getTime();
  interval = setInterval(updateTime, 1000);
}

function updateTime() {
  const currentTime = new Date().getTime();
  const timeElapsed = Math.floor((currentTime - startTime) / 1000);
  timeDisplay.textContent = timeElapsed;

  calculateWPM(timeElapsed);
  calculateAccuracy();
}

function calculateWPM(timeElapsed) {
  const wordsTyped = textInput.value.split(" ").length;
  const wpm = Math.floor((wordsTyped / timeElapsed) * 60);
  wpmDisplay.textContent = wpm;
}

function calculateAccuracy() {
  const inputText = textInput.value;
  const originalText = textDisplay.textContent;
  let correctCharts = 0;

  for (let i = 0; i < inputText.length; i++) {
    if (inputText[i] === originalText[i]) correctCharts++;
  }

  const accuracy = Math.floor((correctCharts / originalText.length) * 100);
  accuracyDisplay.textContent = accuracy + "%";
}

startButton.addEventListener("click", startTest);
textInput.addEventListener("input", () => {
  if (textInput.value === textDisplay.textContent) {
    clearInterval(interval);
    alert("text completed!");
  }
});
