// ===============================
// GAME STATE
// ===============================

let previousNumber = 0;
let currentNumber = 0;
let score = 0;

let gameRunning = false;

let timeLimit = 0;
let timeRemaining = 0;
let timer = null;

let difficulty = 9;

// ===============================
// DOM ELEMENTS
// ===============================

const startScreen = document.getElementById("startScreen");

const gameScreen = document.getElementById("gameScreen");

const gameOverScreen = document.getElementById("gameOverScreen");

const previousNumberElement = document.getElementById("previousNumber");

const currentNumberElement = document.getElementById("currentNumber");

const answerInput = document.getElementById("answerInput");

const submitButton = document.getElementById("submitButton");

const messageElement = document.getElementById("message");

const scoreElement = document.getElementById("score");

const timerElement = document.getElementById("timer");

const startButton = document.getElementById("startButton");

const restartButton = document.getElementById("restartButton");

const timeLimitElement = document.getElementById("timeLimit");

const difficultyElement = document.getElementById("difficulty");

const gameOverMessage = document.getElementById("gameOverMessage");

const finalScoreElement = document.getElementById("finalScore");

const settingsButton = document.getElementById("settingsButton");

const gameSettingsButton = document.getElementById("gameSettingsButton");

const settingsPanel = document.getElementById("settingsPanel");

settingsButton.addEventListener("click", () => {
  settingsPanel.hidden = !settingsPanel.hidden;
});

// gameSettingsButton.addEventListener("click", () => {
//   endGame("settings");
// });

gameSettingsButton.addEventListener("click", openSettings);
function openSettings() {
  clearInterval(timer);

  gameRunning = false;

  gameScreen.hidden = true;

  startScreen.hidden = false;

  settingsPanel.hidden = false;

  startButton.textContent = "Start Game";
}

function showCorrectAnimation() {
  gameScreen.classList.remove("correct");

  void gameScreen.offsetWidth;

  gameScreen.classList.add("correct");
}

function showWrongAnimation() {
  gameScreen.classList.remove("wrong");

  void gameScreen.offsetWidth;

  gameScreen.classList.add("wrong");
}
// ===============================
// NUMBER GENERATOR
// ===============================

function generateNumber() {
  return Math.floor(Math.random() * (difficulty + 1));
}

// ===============================
// START GAME
// ===============================

function startGame() {
  clearInterval(timer);

  // Get selected options

  timeLimit = Number(timeLimitElement.value);

  timeRemaining = timeLimit;

  timerElement.classList.remove("timer-warning");

  difficulty = Number(difficultyElement.value);

  // Generate initial numbers

  previousNumber = generateNumber();

  currentNumber = generateNumber();

  // Reset state

  score = 0;

  gameRunning = true;

  // Change screen

  startScreen.hidden = true;

  gameOverScreen.hidden = true;

  gameScreen.hidden = false;

  // Reset UI

  messageElement.textContent = "";

  answerInput.value = "";

  scoreElement.textContent = score;

  // Timer

  if (timeLimit > 0) {
    timerElement.textContent = formatTime(timeRemaining);

    timer = setInterval(updateTimer, 1000);
  } else {
    timerElement.textContent = "∞";
  }

  updateGameUI();

  answerInput.focus();
}

// ===============================
// UPDATE GAME UI
// ===============================

function updateGameUI() {
  previousNumberElement.textContent = previousNumber;

  currentNumberElement.textContent = currentNumber;

  scoreElement.textContent = score;
}

// ===============================
// CHECK ANSWER
// ===============================

function checkAnswer() {
  if (!gameRunning) {
    return;
  }

  const inputValue = answerInput.value.trim();

  // Ignore empty input

  if (inputValue === "") {
    return;
  }

  const different = Math.abs(previousNumber - currentNumber);

  const answer = Number(inputValue);

  // ===============================
  // WRONG ANSWER
  // ===============================

  if (answer !== different) {
    // Timed mode:
    // Wrong answer does NOT end game

    if (timeLimit > 0) {
      showWrongAnimation();

      messageElement.textContent = "Wrong answer!";

      answerInput.value = "";

      answerInput.focus();

      return;
    }

    // No Time Limit:
    // Wrong answer ends game

    endGame("wrong");

    return;
  }

  // ===============================
  // CORRECT ANSWER
  // ===============================

  score++;

  showCorrectAnimation();

  previousNumber = currentNumber;

  currentNumber = generateNumber();

  messageElement.textContent = "Correct!";

  answerInput.value = "";

  updateGameUI();

  answerInput.focus();
}

// ===============================
// TIMER
// ===============================

function updateTimer() {
  if (!gameRunning) {
    return;
  }

  timeRemaining--;

  timerElement.textContent = formatTime(timeRemaining);

  if (timeRemaining <= 10) {
    timerElement.classList.add("timer-warning");
  }

  if (timeRemaining <= 0) {
    timerElement.classList.remove("timer-warning");

    endGame("time");
  }
}

// ===============================
// FORMAT TIME
// ===============================

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

// ===============================
// END GAME
// ===============================

function endGame(reason) {
  gameRunning = false;

  clearInterval(timer);

  gameScreen.hidden = true;

  gameOverScreen.hidden = false;

  finalScoreElement.textContent = score;

  if (reason === "time") {
    gameOverMessage.textContent = "Time's Up!";
  }

  if (reason === "wrong") {
    gameOverMessage.textContent = "Wrong Answer!";
  }
}

// ===============================
// EVENTS
// ===============================

startButton.addEventListener("click", startGame);

restartButton.addEventListener("click", startGame);

submitButton.addEventListener("click", checkAnswer);

answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkAnswer();
  }
});
