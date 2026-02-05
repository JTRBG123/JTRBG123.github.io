console.log("running");

let correctNumber = 13;
let correctMessage = "Congrats!";

let guessInput = document.querySelector("#guessInput");
let guessButton = document.querySelector("#guessButton");
let guessResult = document.querySelector("#guessResult");
let guesses = [];

guessButton.addEventListener("click", function () {
    let guess = guessInput.value;
    guesses.push(guess); // Store the guess

    // Clear previous content and display all guesses
    guessResult.textContent = `Guesses: ${guesses.join(', ')}\n`;

    if (correctNumber == guess){
        guessResult.textContent += correctMessage;
        guessResult.style.color = "green"; 
    }else if(guess < correctNumber){
        guessResult.textContent += "Too low!";
        guessResult.style.color = "red"; 
    }else if(guess > correctNumber){
        guessResult.textContent += "Too high!";
        guessResult.style.color = "red"; 
    }

    if(guesses.length <= 7 && guess == correctNumber){
        guessResult.textContent += "\nYou did it in 7 or fewer guesses!";
    }
});

