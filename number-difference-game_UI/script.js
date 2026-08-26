let previousNumber = 0;
let currentNumber = 0;
let score = 0;

// Get HTML elements
const previousNumberElement = document.getElementById("previousNumber");

const currentNumberElement = document.getElementById("currentNumber");

const answerInput = document.getElementById("answerInput");

const submitButton = document.getElementById("submitButton");

const messageElement = document.getElementById("message");

const scoreElement = document.getElementById("score");

// Generate initial numbers
previousNumber = Math.floor(Math.random() * 10);

currentNumber = Math.floor(Math.random() * 10);

// Display initial numbers
previousNumberElement.textContent = previousNumber;

currentNumberElement.textContent = currentNumber;

// Listen for button click
submitButton.addEventListener("click", checkAnswer);

// Check player's answer
function checkAnswer() {
  const different = Math.abs(previousNumber - currentNumber);

  const answer = Number(answerInput.value);

  // Wrong answer
  if (answer !== different) {
    messageElement.textContent = "Wrong answer! Game Over.";

    return;
  }

  // Correct answer
  score++;

  scoreElement.textContent = score;

  messageElement.textContent = "Correct!";

  // Generate next round
  previousNumber = currentNumber;

  currentNumber = Math.floor(Math.random() * 10);

  // Update browser
  previousNumberElement.textContent = previousNumber;

  currentNumberElement.textContent = currentNumber;

  // Clear input
  answerInput.value = "";
}
