document.querySelector("button").addEventListener("click", gradeQuiz);

shuffleQ1Choices();
function shuffleQ1Choices() {
    let q1Choices = ["font-color", "color", "text-color", "color-text",];

    for(let i of q1Choices) {


    let radioElement = document.createElement("input");
    radioElement.type = "radio";
    radioElement.name = "q1";
    radioElement.value = i;

    let labelElement = document.createElement("label");
    labelElement.textContent = i;

    labelElement.prepend(radioElement);
    labelElement.prepend(" ");

    document.querySelector("#q1ChoicesDiv").append(labelElement);

    console.log(labelElement);
    }
}

// script.js

function displayTextBox(questionText) {
    // Get the container element
    const container = document.getElementById('quiz-container');

    // Create the label element for the question
    const questionLabel = document.createElement('label');
    questionLabel.textContent = questionText;
    questionLabel.setAttribute('for', 'quiz-answer'); // Associate label with the input

    // Create the input (text box) element
    const answerInput = document.createElement('input');
    answerInput.setAttribute('type', 'text');
    answerInput.setAttribute('id', 'quiz-answer');
    answerInput.setAttribute('placeholder', 'Enter your answer');

    // Append the elements to the container
    container.appendChild(questionLabel);
    container.appendChild(answerInput);
}

// Call the function to display the question and text box
displayTextBox("2. What is the capital of Texas?");


// You can also add a function to get the user's input:
function checkAnswer() {
    const inputElement = document.getElementById('quiz-answer');
    const userAnswer = inputElement.value;
   
    // You would add your logic here to compare the answer
}


function gradeQuiz() {
    let q1UserAnswer = document.querySelector("input[name='q1']:checked").value;
    let q2UserAnswer = document.getElementById("quiz-answer").value;
    let q3UserAnswer = document.getElementById("pkmnType").value;
    alert("Your answer to question 1 is: " + q1UserAnswer + "\nYour answer to question 2 is: " + q2UserAnswer + "\nYour answer to question 3 is: " + q3UserAnswer);

}