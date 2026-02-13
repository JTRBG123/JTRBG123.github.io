//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);
document.querySelector("#playerGuess").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

//Global variables
let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;

initializeGame();

function initializeGame() {
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);
   attempts = 0;

   //hiding the Reset button
   document.querySelector("#resetBtn").style.display = "none";

    //showing the Guess button
    document.querySelector("#guessBtn").style.display = "inline";

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus();
    playerGuess.value = "";

    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";

    //clearing the input field
   document.querySelector("#guesses").textContent = "";
}

function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);
    
    // Validate input - check if it's a number
    if (isNaN(guess) || guess === "") {
        feedback.textContent = "Please enter a valid number";
        feedback.style.color = "red";
        return;
    }
    
    guess = parseInt(guess);
    
    if (guess < 1 || guess > 99){
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }
    
    attempts++;
    console.log("Attempts: " + attempts);
    
    // Add guess to the list
    document.querySelector("#guesses").textContent += guess + " ";
    
    feedback.style.color = "orange";
    if (guess == randomNumber) {
        feedback.textContent = "You guessed it! You Won!";
        feedback.style.color = "darkgreen";
        wins++;
        document.querySelector("#wins").textContent = wins;
        gameOver();
    } else {
        if(attempts == 7){
            feedback.textContent = "You Lost! The number was " + randomNumber;
            feedback.style.color = "red";
            losses++;
            document.querySelector("#losses").textContent = losses;
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was high";
        } else {
            feedback.textContent = "Guess was low";
        }
    }
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none";
    resetBtn.style.display = "inline";
}