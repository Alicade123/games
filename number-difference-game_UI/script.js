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
let revealTimer = null;

let difficulty = 9;
let totalCounter = 0;

// ===============================
// DOM ELEMENTS
// ===============================

const startScreen = document.getElementById("startScreen");

const gameScreen = document.getElementById("gameScreen");

const gameOverScreen = document.getElementById("gameOverScreen");

const displayedNumber = document.getElementById("displayedNumber");

const memoryMessage = document.getElementById("memoryMessage");

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

const totalQuestionsElement = document.getElementById("totalQuestions");

const settingsButton = document.getElementById("settingsButton");

const gameSettingsButton = document.getElementById("gameSettingsButton");

const settingsPanel = document.getElementById("settingsPanel");

const infoButton = document.getElementById("infoButton");

const infoButtonStart = document.getElementById("infoButtonStart");

const infoModal = document.getElementById("infoModal");

const closeInfoButton = document.getElementById("closeInfoButton");

// ===============================
// INFO MODAL
// ===============================

function openInfo() {
  infoModal.hidden = false;
}

function closeInfo() {
  infoModal.hidden = true;
}

infoButton.addEventListener("click", openInfo);

infoButtonStart.addEventListener("click", openInfo);

closeInfoButton.addEventListener("click", closeInfo);

infoModal.addEventListener("click", (event) => {
  if (event.target === infoModal) {
    closeInfo();
  }
});

// ===============================
// SETTINGS
// ===============================

settingsButton.addEventListener("click", () => {
  settingsPanel.hidden = !settingsPanel.hidden;
});

gameSettingsButton.addEventListener("click", openSettings);

function openSettings() {
  clearInterval(timer);

  clearTimeout(revealTimer);

  gameRunning = false;

  answerInput.disabled = true;

  gameScreen.hidden = true;

  startScreen.hidden = false;

  settingsPanel.hidden = false;

  startButton.textContent = "Start Game";
}

// ===============================
// ANIMATIONS
// ===============================

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
  // Stop any previous timers

  clearInterval(timer);

  clearTimeout(revealTimer);

  // ===============================
  // GET SELECTED SETTINGS
  // ===============================

  timeLimit = Number(timeLimitElement.value);

  timeRemaining = timeLimit;

  difficulty = Number(difficultyElement.value);

  // ===============================
  // GENERATE FIRST TWO NUMBERS
  // ===============================

  previousNumber = generateNumber();

  currentNumber = generateNumber();

  // ===============================
  // RESET GAME STATE
  // ===============================

  totalCounter = 0;

  score = 0;

  gameRunning = true;

  // ===============================
  // CHANGE SCREEN
  // ===============================

  startScreen.hidden = true;

  gameOverScreen.hidden = true;

  gameScreen.hidden = false;

  // ===============================
  // RESET UI
  // ===============================

  messageElement.textContent = "";

  scoreElement.textContent = score;

  answerInput.value = "";

  answerInput.disabled = true;

  // ===============================
  // ANSWER CONTROLS
  // ===============================

  updateAnswerControls();

  // ===============================
  // SHOW FIRST NUMBER
  // ===============================

  displayedNumber.textContent = previousNumber;

  memoryMessage.textContent = "Remember this number!";

  // ===============================
  // AFTER 2 SECONDS
  // SHOW CURRENT NUMBER
  // ===============================

  revealTimer = setTimeout(() => {
    if (!gameRunning) {
      return;
    }

    displayedNumber.textContent = currentNumber;

    memoryMessage.textContent = "What's the difference?";

    // Allow answering only now

    answerInput.disabled = false;

    answerInput.focus();
  }, 2000);

  // ===============================
  // GAME TIMER
  // ===============================

  if (timeLimit > 0) {
    timerElement.textContent = formatTime(timeRemaining);

    timer = setInterval(updateTimer, 1000);
  } else {
    timerElement.textContent = "∞";
  }

  updateGameUI();
}

// ===============================
// START NEXT ROUND
// ===============================

function startRound() {

    clearTimeout(revealTimer);

    // Current number becomes the previous number
    previousNumber = currentNumber;

    // Generate the next current number
    currentNumber = generateNumber();

    // Immediately display the new current number
    displayedNumber.textContent = currentNumber;

    memoryMessage.textContent =
        "What's the difference?";

    // Clear previous answer
    answerInput.value = "";

    // Allow answer immediately
    answerInput.disabled = false;

    answerInput.focus();
}

// ===============================
// UPDATE GAME UI
// ===============================

function updateGameUI() {
  scoreElement.textContent = score;
}

// ===============================
// DIFFICULTY
// ===============================

function isEasyMode() {
  return difficulty === 9;
}

function updateAnswerControls() {
  if (isEasyMode()) {
    submitButton.hidden = true;
  } else {
    submitButton.hidden = false;
  }
}

// ===============================
// CHECK ANSWER
// ===============================

function checkAnswer() {
  if (!gameRunning) {
    return;
  }

  // Do not check while
  // the number is being revealed

  if (answerInput.disabled) {
    return;
  }

  const inputValue = answerInput.value.trim();

  // Ignore empty input

  if (inputValue === "") {
    return;
  }

  const different = Math.abs(previousNumber - currentNumber);

  const answer = Number(inputValue);
 
   totalCounter++;

  // ===============================
  // CORRECT ANSWER
  // ===============================

  if (answer === different) {
    score++;

    showCorrectAnimation();

    messageElement.textContent = "Correct!";

    updateGameUI();

    startRound();

    return;
  }

  // ===============================
  // WRONG ANSWER
  // ===============================

  showWrongAnimation();

  // ===============================
  // TIMED MODE
  // ===============================

  if (timeLimit > 0) {
    messageElement.textContent = "Wrong answer!";

    startRound();

    return;
  }

  // ===============================
  // NO TIME LIMIT
  // ===============================

  endGame("wrong");
}

// ===============================
// EASY MODE
// AUTOMATIC ANSWER CHECKING
// ===============================

answerInput.addEventListener("input", () => {
  if (!gameRunning) {
    return;
  }

  if (!isEasyMode()) {
    return;
  }

  if (answerInput.disabled) {
    return;
  }

  const value = answerInput.value.trim();

  if (value === "") {
    return;
  }

  // Easy answers are 0–9,
  // therefore one digit is enough.

  checkAnswer();
});

// ===============================
// MEDIUM / HARD
// ENTER KEY
// ===============================

answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !isEasyMode()) {
    checkAnswer();
  }
});

// ===============================
// CHECK BUTTON
// MEDIUM / HARD
// ===============================

submitButton.addEventListener("click", checkAnswer);

// ===============================
// TIMER
// ===============================

function updateTimer() {
  if (!gameRunning) {
    return;
  }

  timeRemaining--;

  timerElement.textContent = formatTime(timeRemaining);

  // ===============================
  // TIMER WARNING
  // ===============================

  if (timeRemaining <= 10) {
    timerElement.classList.add("timer-warning");
  }

  // ===============================
  // TIME UP
  // ===============================

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

  return (
    `${String(minutes).padStart(2, "0")}:` +
    `${String(remainingSeconds).padStart(2, "0")}`
  );
}

// ===============================
// END GAME
// ===============================

function endGame(reason) {
  gameRunning = false;

  clearInterval(timer);

  clearTimeout(revealTimer);

  answerInput.disabled = true;

  gameScreen.hidden = true;

  gameOverScreen.hidden = false;

  finalScoreElement.textContent = score;

  totalQuestionsElement.textContent = totalCounter;

  // ===============================
  // TIME UP
  // ===============================

  if (reason === "time") {
    gameOverMessage.textContent = "Time's Up!";
  }

  // ===============================
  // WRONG ANSWER
  // ===============================

  if (reason === "wrong") {
    gameOverMessage.textContent = "Wrong Answer!";
  }
}

// ===============================
// EVENTS
// ===============================

startButton.addEventListener("click", startGame);

restartButton.addEventListener("click", startGame);
