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

createQ5Checkboxes();
function createQ5Checkboxes() {
    let q5Choices = ["color", "margin", "text-font", "padding", "size"];
    
    for(let i of q5Choices) {
        let checkboxElement = document.createElement("input");
        checkboxElement.type = "checkbox";
        checkboxElement.name = "q5";
        checkboxElement.value = i;
        checkboxElement.id = "q5_" + i;

        let labelElement = document.createElement("label");
        labelElement.htmlFor = "q5_" + i;
        labelElement.textContent = i;

        labelElement.prepend(checkboxElement);
        labelElement.prepend(" ");

        document.querySelector("#q5ChoicesDiv").append(labelElement);
        document.querySelector("#q5ChoicesDiv").append(document.createElement("br"));
    }
}
function checkAnswer() {
    const inputElement = document.getElementById('quiz-answer');
    const userAnswer = inputElement.value;
   
    // You would add your logic here to compare the answer
}


function gradeQuiz() {
    // Define correct answers
    const correctAnswers = {
        q1: "color",
        q2: "Austin",
        q3: "Normal",
        q4: "50",
        q5: ["color", "margin", "padding"]  // Multiple correct answers for checkboxes
    };

    let q1UserAnswer = document.querySelector("input[name='q1']:checked").value;
    let q2UserAnswer = document.getElementById("quiz-answer").value;
    let q3UserAnswer = document.getElementById("pkmnType").value;
    let q4UserAnswer = document.getElementById("textSize").value;

    // Get Q5 checkbox answers
    let q5UserAnswers = [];
    let q5Checkboxes = document.querySelectorAll("input[name='q5']:checked");
    q5Checkboxes.forEach(checkbox => {
        q5UserAnswers.push(checkbox.value);
    });

    // Check Q1 and color the choices
    const q1Correct = q1UserAnswer === correctAnswers.q1;
    const q1Labels = document.querySelectorAll("#q1ChoicesDiv label");
    q1Labels.forEach(label => {
        const radio = label.querySelector("input");
        if (radio.value === correctAnswers.q1) {
            label.style.color = q1Correct ? "green" : "red";
        } else if (radio.checked) {
            label.style.color = "red";
        }
    });

    // Check Q2 and color the input
    const q2Input = document.getElementById("quiz-answer");
    q2Input.style.color = q2UserAnswer === correctAnswers.q2 ? "green" : "red";

    // Check Q3 and color the select
    const q3Select = document.getElementById("pkmnType");
    q3Select.style.color = q3UserAnswer === correctAnswers.q3 ? "green" : "red";

    // Check Q4 and color the number input
    const q4Input = document.getElementById("textSize");
    q4Input.style.color = q4UserAnswer === correctAnswers.q4 ? "green" : "red";

    // Check Q5 checkboxes and color them
    const q5CheckCorrect = JSON.stringify(q5UserAnswers.sort()) === JSON.stringify(correctAnswers.q5.sort());
    const q5Labels = document.querySelectorAll("#q5ChoicesDiv label");
    q5Labels.forEach(label => {
        const checkbox = label.querySelector("input");
        if (correctAnswers.q5.includes(checkbox.value)) {
            label.style.color = q5CheckCorrect || checkbox.checked ? "green" : "red";
        } else {
            label.style.color = checkbox.checked ? "red" : "black";
        }
    });

    alert("Your answer to question 1 is: " + q1UserAnswer + 
        "\nYour answer to question 2 is: " + q2UserAnswer + 
        "\nYour answer to question 3 is: " + q3UserAnswer +
        "\nYour answer to question 4 is: " + q4UserAnswer +
        "\nYour answer to question 5 is: " + (q5UserAnswers.length > 0 ? q5UserAnswers.join(", ") : "None selected"));
}