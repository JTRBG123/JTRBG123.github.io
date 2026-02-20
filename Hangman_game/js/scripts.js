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
const hangmanImage = document.getElementById("hangmanImage");
const pageBody = document.body;

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

function getHangmanImageSvg(step) {
	const parts = [
		step >= 1 ? "<line x1='110' y1='75' x2='110' y2='105' stroke='#111827' stroke-width='4' />" : "",
		step >= 2 ? "<circle cx='110' cy='118' r='13' fill='none' stroke='#111827' stroke-width='4' />" : "",
		step >= 3 ? "<line x1='110' y1='131' x2='110' y2='167' stroke='#111827' stroke-width='4' />" : "",
		step >= 4 ? "<line x1='110' y1='141' x2='90' y2='157' stroke='#111827' stroke-width='4' />" : "",
		step >= 5 ? "<line x1='110' y1='141' x2='130' y2='157' stroke='#111827' stroke-width='4' />" : "",
		step >= 6 ? "<line x1='110' y1='167' x2='95' y2='192' stroke='#111827' stroke-width='4' /><line x1='110' y1='167' x2='125' y2='192' stroke='#111827' stroke-width='4' />" : ""
	].join("");

	return `
		<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 220'>
			<rect width='220' height='220' fill='#f9fafb' />
			<line x1='20' y1='200' x2='150' y2='200' stroke='#111827' stroke-width='4' />
			<line x1='55' y1='200' x2='55' y2='35' stroke='#111827' stroke-width='4' />
			<line x1='55' y1='35' x2='110' y2='35' stroke='#111827' stroke-width='4' />
			<line x1='110' y1='35' x2='110' y2='75' stroke='#111827' stroke-width='4' />
			${parts}
		</svg>
	`;
}

function updateImage() {
	const svgMarkup = getHangmanImageSvg(wrongLetters.length);
	hangmanImage.src = `data:image/svg+xml;utf8,${encodeURIComponent(svgMarkup)}`;
}

function updateStyles() {
	const remainingGuesses = maxWrongGuesses - wrongLetters.length;
	const hue = Math.max(0, 120 - wrongLetters.length * 18);
	pageBody.style.backgroundColor = `hsl(${hue}, 75%, 95%)`;
	guessesLeftDisplay.style.fontWeight = "700";
	guessesLeftDisplay.style.color = remainingGuesses <= 2 ? "#b91c1c" : "#065f46";
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
	updateImage();
	updateStyles();
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
	updateImage();
	updateStyles();
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
