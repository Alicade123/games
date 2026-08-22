// Import and execute the module instantly
const prompt = require('prompt-sync')();
const numberGenerator =()=>{

let previousNumber = 0;
let currentNumber = 0;

let different =0;
let answer = 0;

previousNumber = Math.floor(Math.random() * 10);
currentNumber = Math.floor(Math.random() * 10);

//Show the initial numbers to the user
console.log("Previous Number: " + previousNumber);

do{ 
if(previousNumber >= currentNumber){
    different = previousNumber - currentNumber;
}
else{
    different = currentNumber - previousNumber;
}


console.log("Current Number: " + currentNumber);
// console.log("Difference: " + different);

// Read input synchronously 
answer = prompt('Enter answer: ');
// console.log("Your Answer: " + answer);

//update the variables for the next iteration
previousNumber = currentNumber;
currentNumber = Math.floor(Math.random() * 10);

}while(answer == different);
return "Game Over! Your answer is incorrect.";

}
console.log(numberGenerator());