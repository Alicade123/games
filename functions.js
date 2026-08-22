// Import and execute the module instantly
const prompt = require('prompt-sync')();
const numberGenerator =()=>{

let previousNumber = 0;
let currentNumber = 0;
let score = 0;

previousNumber = Math.floor(Math.random() * 10);
currentNumber = Math.floor(Math.random() * 10);

//Show the initial numbers to the user
console.log("Previous Number: " + previousNumber);

while(true){
let different = Math.abs(previousNumber - currentNumber);

//Show the current number to the user
console.log("Current Number: " + currentNumber);


// Read input synchronously 
let answer = Number(prompt('Enter answer: '));


// Check answer against the correct difference
    if (answer !== different) {
      break; // Exit the loop instantly on a wrong answer
    }

//update the variables for the next iteration
previousNumber = currentNumber;
currentNumber = Math.floor(Math.random() * 10);
score++;
}
return `Game Over! Your answer is incorrect. Final score: ${score}`;

}
console.log(numberGenerator());