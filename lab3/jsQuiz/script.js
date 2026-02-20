const QUESTION_POINTS = 20;
const TOTAL_QUESTIONS = 5;
const STORAGE_KEY = "jsQuizTakeCount";

const quizForm = document.getElementById("quizForm");
const attemptCountEl = document.getElementById("attemptCount");
const totalScoreEl = document.getElementById("totalScore");
const messageEl = document.getElementById("message");

const q2OptionsContainer = document.getElementById("q2Options");
const q2Choices = [
  { value: "JSON.parse", label: "JSON.parse()", correct: true },
  { value: "JSON.stringify", label: "JSON.stringify()", correct: false },
  { value: "JSON.convert", label: "JSON.convert()", correct: false },
  { value: "parseJSON", label: "parseJSON()", correct: false }
];

function shuffle(array) {
  const cloned = [...array];
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
}

function renderQuestion2() {
  const randomized = shuffle(q2Choices);
  q2OptionsContainer.innerHTML = "";

  randomized.forEach((choice, index) => {
    const optionId = `q2Option${index}`;

    const input = document.createElement("input");
    input.type = "radio";
    input.id = optionId;
    input.name = "q2";
    input.value = choice.value;

    const label = document.createElement("label");
    label.setAttribute("for", optionId);
    label.textContent = choice.label;

    q2OptionsContainer.appendChild(input);
    q2OptionsContainer.appendChild(label);
  });
}

function getAttemptCount() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? Number.parseInt(raw, 10) : 0;
}

function setAttemptCount(value) {
  localStorage.setItem(STORAGE_KEY, String(value));
  attemptCountEl.textContent = String(value);
}

function setFeedback(feedbackId, isCorrect, correctText, incorrectText) {
  const feedbackEl = document.getElementById(feedbackId);
  const imageFile = isCorrect ? "img/check.svg" : "img/x.svg";
  const altText = isCorrect ? "Correct" : "Incorrect";
  const text = isCorrect ? correctText : incorrectText;

  feedbackEl.innerHTML = `
    <img src="${imageFile}" alt="${altText}" class="status-icon">
    <span class="${isCorrect ? "right" : "wrong"}">${text}</span>
  `;
}

function gradeQuestion1() {
  const answer = document.getElementById("q1Input").value.trim().toLowerCase();
  const correct = answer === "const";
  setFeedback("feedback1", correct, "Correct!", "Incorrect. Correct answer: const");
  return correct;
}

function gradeQuestion2() {
  const selected = document.querySelector('input[name="q2"]:checked');
  const correct = selected && selected.value === "JSON.parse";
  setFeedback("feedback2", Boolean(correct), "Correct!", "Incorrect. Correct answer: JSON.parse()");
  return Boolean(correct);
}

function gradeQuestion3() {
  const selected = Array.from(document.querySelectorAll('input[name="q3"]:checked')).map((item) => item.value);
  const correctAnswers = ["string", "boolean", "undefined"];
  const correct = selected.length === correctAnswers.length
    && correctAnswers.every((item) => selected.includes(item));

  setFeedback(
    "feedback3",
    correct,
    "Correct!",
    "Incorrect. Correct answers: string, boolean, undefined"
  );
  return correct;
}

function gradeQuestion4() {
  const selected = document.getElementById("q4Select").value;
  const correct = selected === "===";
  setFeedback("feedback4", correct, "Correct!", "Incorrect. Correct answer: ===");
  return correct;
}

function gradeQuestion5() {
  const value = Number(document.getElementById("q5Input").value);
  const correct = value === 2;
  setFeedback("feedback5", correct, "Correct!", "Incorrect. Correct answer: 2");
  return correct;
}

function gradeQuiz(event) {
  event.preventDefault();

  const results = [
    gradeQuestion1(),
    gradeQuestion2(),
    gradeQuestion3(),
    gradeQuestion4(),
    gradeQuestion5()
  ];

  const totalCorrect = results.filter(Boolean).length;
  const totalScore = totalCorrect * QUESTION_POINTS;
  totalScoreEl.textContent = String(totalScore);

  if (totalScore > 80) {
    messageEl.textContent = "Excellent work! Congratulations on scoring above 80!";
    messageEl.className = "success-message";
  } else {
    messageEl.textContent = "Keep practicing and try again.";
    messageEl.className = "normal-message";
  }

  const attempts = getAttemptCount() + 1;
  setAttemptCount(attempts);
}

function resetQuiz() {
  totalScoreEl.textContent = "0";
  messageEl.textContent = "";
  messageEl.className = "";

  for (let index = 1; index <= TOTAL_QUESTIONS; index += 1) {
    const feedbackEl = document.getElementById(`feedback${index}`);
    feedbackEl.innerHTML = "";
  }
}

renderQuestion2();
setAttemptCount(getAttemptCount());
quizForm.addEventListener("submit", gradeQuiz);
quizForm.addEventListener("reset", resetQuiz);
