const texts = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing speed tests are a great way to improve your skills.",
  "Practice typing to increase accuracy and speed.",
  "Programming requires attention to detail and precise typing.",
  "Good typing skills can significantly boost your productivity.",
];

class TypingTest {
  constructor() {
    this.textDisplay = document.getElementById("text-display");
    this.textInput = document.getElementById("text-input");
    this.startButton = document.getElementById("start-btn");
    this.timeDisplay = document.getElementById("time-display");
    this.wpmDisplay = document.getElementById("wpn-display");
    this.accuracyDisplay = document.getElementById("accuracy-display");
    this.resetButton = document.getElementById("reset-btn");

    this.currentText = "";
    this.startTime = 0;
    this.interval = null;
    this.isTestActive = false;

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.startButton.addEventListener("click", () => this.startTest());
    this.resetButton.addEventListener("click", () => this.resetTest());
    this.textInput.addEventListener("input", () => this.handleInput());
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !this.isTestActive) {
        this.startTest();
      }
    });
  }

  startTest() {
    if (this.isTestActive) return;

    this.isTestActive = true;
    this.textInput.value = "";
    this.textInput.disabled = false;
    this.textInput.focus();
    this.startButton.disabled = true;

    let newText;
    do {
      newText = texts[Math.floor(Math.random() * texts.length)];
    } while (newText === this.currentText && texts.length > 1);

    this.currentText = newText;
    this.textDisplay.textContent = this.currentText;
    this.highlightText("");

    this.startTime = new Date().getTime();
    this.interval = setInterval(() => this.updateStats(), 100);
  }

  resetTest() {
    this.isTestActive = false;
    clearInterval(this.interval);
    this.textInput.value = "";
    this.textInput.disabled = false;
    this.startButton.disabled = false;
    this.timeDisplay.textContent = "0";
    this.wpmDisplay.textContent = "0";
    this.accuracyDisplay.textContent = "0%";
    this.textDisplay.innerHTML = "Click Start or press Enter to begin";
  }

  handleInput() {
    const inputText = this.textInput.value;
    this.highlightText(inputText);
    this.updateStats();

    if (inputText === this.currentText) {
      this.completeTest();
    }
  }

  highlightText(inputText) {
    let html = "";
    const originalText = this.currentText;

    for (let i = 0; i < originalText.length; i++) {
      if (i < inputText.length) {
        if (inputText[i] === originalText[i]) {
          html += `<span class="correct">${originalText[i]}</span>`;
        } else {
          html += `<span class="incorrect">${originalText[i]}</span>`;
        }
      } else {
        html += originalText[i];
      }
    }
    this.textDisplay.innerHTML = html;
  }

  updateStats() {
    const currentTime = new Date().getTime();
    const timeElapsed = Math.floor((currentTime - this.startTime) / 1000);
    this.timeDisplay.textContent = timeElapsed;

    const inputText = this.textInput.value;
    const words = inputText.trim().split(/\s+/).length;
    const minutes = timeElapsed / 60;
    const wpm = Math.round(minutes > 0 ? words / minutes : 0);
    this.wpmDisplay.textContent = wpm;

    let correctCharts = 0;
    for (let i = 0; i < inputText.length; i++) {
      if (inputText[i] === this.currentText[i]) correctCharts++;
    }

    const accuracy = Math.round(
      (correctCharts / Math.max(inputText.length, 1)) * 100
    );
    this.accuracyDisplay.textContent = accuracy + "%";
  }

  completeTest() {
    clearInterval(this.interval);
    this.isTestActive = false;
    this.textInput.disabled = true;
    this.startButton.disabled = false;

    const finalTime = parseInt(this.timeDisplay.textContent);
    const finalWPM = parseInt(this.wpmDisplay.textContent);
    const finalAccuracy = parseInt(this.accuracyDisplay.textContent);

    setTimeout(() => {
      alert(
        `Congratulations!\n\n` +
          `Time: ${finalTime} seconds \n` +
          `WPM: ${finalWPM} \n` +
          `Accuracy: ${finalAccuracy}% \n`
      );
    }, 100);
  }
}

window.addEventListener("load", () => {
  const typingTest = new TypingTest();
});
