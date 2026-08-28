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

// ===============================
// DOM ELEMENTS
// ===============================

const previousNumberElement = document.getElementById("previousNumber");

const currentNumberElement = document.getElementById("currentNumber");

const answerInput = document.getElementById("answerInput");

const submitButton = document.getElementById("submitButton");

const messageElement = document.getElementById("message");

const scoreElement = document.getElementById("score");

const startButton = document.getElementById("startButton");

const timeLimitElement = document.getElementById("timeLimit");

const timerElement = document.getElementById("timer");

// ===============================
// START GAME
// ===============================

function startGame() {
  // Stop any previous timer
  clearInterval(timer);

  // Get selected time
  timeLimit = Number(timeLimitElement.value);

  timeRemaining = timeLimit;

  // Generate numbers
  previousNumber = Math.floor(Math.random() * 10);

  currentNumber = Math.floor(Math.random() * 10);

  // Reset score
  score = 0;

  gameRunning = true;

  // Enable game controls
  answerInput.disabled = false;
  submitButton.disabled = false;

  // Update button
  startButton.textContent = "Restart Game";

  // Reset message
  messageElement.textContent = "";

  // Clear input
  answerInput.value = "";

  // Start timer if time limit exists
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
// UPDATE UI
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

    const different =
        Math.abs(previousNumber - currentNumber);

    const answer =
        Number(answerInput.value);


    // ===============================
    // WRONG ANSWER
    // ===============================

    if (answer !== different) {

        // Timed game:
        // Wrong answer does NOT end the game
        if (timeLimit > 0) {

            messageElement.textContent =
                "Wrong answer!";

            answerInput.value = "";

            return;
        }


        // No Time Limit:
        // Wrong answer ends the game
        endGame("wrong");

        return;
    }


    // ===============================
    // CORRECT ANSWER
    // ===============================

    score++;

    previousNumber =
        currentNumber;

    currentNumber =
        Math.floor(Math.random() * 10);

    messageElement.textContent =
        "Correct!";

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

  if (timeRemaining <= 0) {
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

  answerInput.disabled = true;
  submitButton.disabled = true;

  if (reason === "time") {
    messageElement.textContent = `Time's Up! Final Score: ${score}`;

    timerElement.textContent = "00:00";
  }

  if (reason === "wrong") {
    messageElement.textContent = `Wrong Answer! Game Over. Final Score: ${score}`;
  }
}

// ===============================
// EVENTS
// ===============================

startButton.addEventListener("click", startGame);

submitButton.addEventListener("click", checkAnswer);
