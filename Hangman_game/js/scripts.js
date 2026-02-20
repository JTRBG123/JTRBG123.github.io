const words = [
	"javascript",
	"browser",
	"variable",
	"function",
	"object",
	"coding",
	"network",
	"computer",
	"keyboard",
	"program"
];

const maxWrongGuesses = 6;

const wordDisplay = document.getElementById("wordDisplay");
const wrongLettersDisplay = document.getElementById("wrongLetters");
const guessesLeftDisplay = document.getElementById("guessesLeft");
const messageDisplay = document.getElementById("message");
const letterInput = document.getElementById("letterInput");
const guessButton = document.getElementById("guessButton");
const newGameButton = document.getElementById("newGameButton");

let selectedWord = "";
let correctLetters = [];
let wrongLetters = [];
let gameOver = false;

function chooseRandomWord() {
	const randomIndex = Math.floor(Math.random() * words.length);
	return words[randomIndex];
}

function updateWordDisplay() {
	const display = selectedWord
		.split("")
		.map((letter) => (correctLetters.includes(letter) ? letter : "_"))
		.join(" ");

	wordDisplay.textContent = display;
}

function updateStatus() {
	wrongLettersDisplay.textContent = wrongLetters.length ? wrongLetters.join(", ") : "None";
	guessesLeftDisplay.textContent = maxWrongGuesses - wrongLetters.length;
}

function checkGameResult() {
	const allLettersGuessed = selectedWord
		.split("")
		.every((letter) => correctLetters.includes(letter));

	if (allLettersGuessed) {
		messageDisplay.textContent = "You won! Great job!";
		gameOver = true;
	} else if (wrongLetters.length >= maxWrongGuesses) {
		messageDisplay.textContent = `You lost! The word was "${selectedWord}".`;
		gameOver = true;
	}
}

function handleGuess() {
	if (gameOver) {
		return;
	}

	const guess = letterInput.value.toLowerCase().trim();
	letterInput.value = "";

	if (!/^[a-z]$/.test(guess)) {
		messageDisplay.textContent = "Please enter one valid letter (a-z).";
		return;
	}

	if (correctLetters.includes(guess) || wrongLetters.includes(guess)) {
		messageDisplay.textContent = "You already guessed that letter.";
		return;
	}

	if (selectedWord.includes(guess)) {
		correctLetters.push(guess);
		messageDisplay.textContent = "Nice! That letter is in the word.";
	} else {
		wrongLetters.push(guess);
		messageDisplay.textContent = "Nope, that letter is not in the word.";
	}

	updateWordDisplay();
	updateStatus();
	checkGameResult();
}

function startNewGame() {
	selectedWord = chooseRandomWord();
	correctLetters = [];
	wrongLetters = [];
	gameOver = false;

	messageDisplay.textContent = "New game started. Good luck!";
	updateWordDisplay();
	updateStatus();
	letterInput.value = "";
	letterInput.focus();
}

guessButton.addEventListener("click", handleGuess);
newGameButton.addEventListener("click", startNewGame);

letterInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		handleGuess();
	}
});

startNewGame();
