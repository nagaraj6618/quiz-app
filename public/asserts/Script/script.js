// Initialize userScore to keep track of the user's score
let userScore = 0;

// Retrieve the username from local storage
const getUserName = localStorage.getItem("name");

// Execute the following code when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
  // Retrieve the username and score from local storage
  const getUserName = localStorage.getItem("name");
  const getUserScore = localStorage.getItem("score");

  // If the username exists, start the quiz
  if (getUserName) {
    startQuiz(getUserName);
  }

  // If the score exists, display it and disable the submit button
  // Check if the user score exists in local storage
if(getUserScore){
  // If the user score exists, disable the submit button
  document.getElementById("submitButton").disabled = true;
  // Set the user score value in the score display element
  document.getElementById("scoreValue").innerHTML=getUserScore;
}


  // Add an event listener to the username form for form submission
document.getElementById("usernameForm").addEventListener("submit", function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  // Get the username input value
  const username = document.getElementById("username-input").value;
  // Store the username in local storage
  localStorage.setItem("name", username);
  // Call the startQuiz function with the username as a parameter
  startQuiz(username);
});
});

// Function to restart the quiz
function restart() {
  localStorage.clear(); // Clear local storage
  window.location.reload(); // Reload the page
}

// Asynchronous function to start the quiz
async function startQuiz() {
  try {
    // Hide the username form and display the quiz elements
    document.getElementById("username-form").style.display = "none";
    document.getElementById("questions-container").style.display = "block";
    document.getElementById("submitButton").style.display = "block";
    document.getElementById("score").style.display = "block";
    document.getElementById("restart").style.display = "block";
    // Display the username retrieved from local storage
    document.getElementById("username-name").innerHTML =
      localStorage.getItem("name");

    // Fetch questions from the server and display them
    const response = await fetch("http://localhost:3000/api/v1/questions");
    const data = await response.json();
    displayQuestions(data);
  } catch (error) {
    // Handle errors if any occur during the process
    console.error("Error starting quiz:", error);
  }
}


// Function to display quiz questions
/**
 * Display quiz questions on the page.
 * @param {Array} questions - Array of question objects containing question details.
 */
function displayQuestions(questions) {
  // Get the container element to display questions
  const questionsContainer = document.getElementById("questions-container");
  // Clear any existing content inside the container
  questionsContainer.innerHTML = "";

  // Loop through each question object
  questions.forEach((question) => {
    // Create a div element to hold each question
    const questionElement = document.createElement("div");
    // Set inner HTML content for the question element
    questionElement.innerHTML = `
      <p>${question.question}</p> <!-- Display the question -->
      <form class="question-form" id="form-${question._id}"> <!-- Create a form for the question -->
        <!-- Create radio buttons for each option and label them -->
        ${question.options
          .map(
            (option) => `
          <input type="radio" name="${question._id}" value="${option}">
          <label>${option}</label><br>
        `
          )
          .join("")} <!-- Join all options to form a string -->
        <!-- Create a paragraph element to display feedback for each question -->
        <p class="feedback" id="feedback-${question._id}"></p>
      </form>
    `;
    // Append the question element to the questions container
    questionsContainer.appendChild(questionElement);
  });
}


// Function to check all answers when the submit button is clicked
async function checkAllAnswers() {
  // Get all question forms
const questions = document.querySelectorAll(".question-form");
// Initialize an array to store user answers
const answers = [];
// Flag to check if all questions are answered
let allQuestionsAnswered = true;

// Loop through each question form
questions.forEach((form) => {
  // Extract the question ID from the form ID
  const questionId = form.id.split("-")[1];
  // Get the selected answer for the current question
  const selectedAnswer = form.querySelector(`input[name="${questionId}"]:checked`);
  
  // If no answer is selected, set allQuestionsAnswered to false and exit the loop
  if (!selectedAnswer) {
    allQuestionsAnswered = false;
    return;
  }
  
  // Push the selected answer to the answers array
  answers.push({
    _id: questionId,
    selectedAnswer: selectedAnswer.value,
  });
});

// If not all questions are answered, display an alert and exit the function
if (!allQuestionsAnswered) {
  alert("Please answer all questions before submitting.");
  return;
}


  try {
    // Send a POST request to check the answers
    const response = await fetch("http://localhost:3000/api/v1/check-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: answers }), // Send user answers in the request body
    });
  
    // Parse the response as JSON
    const results = await response.json();
  
    // Loop through the results and update the feedback and score
    results.forEach((result) => {
      // Get the feedback element for the current question
      const feedbackElement = document.getElementById(`feedback-${result._id}`);
      if (result.isCorrect) {
        // If the answer is correct, display "Correct!" feedback and add the "correct" class
        feedbackElement.textContent = "Correct!";
        feedbackElement.classList.add("correct");
        // Increment the user score
        userScore++;
      } else {
        // If the answer is incorrect, display the correct answer and feedback
        feedbackElement.textContent = `Incorrect. The correct answer is: ${result.correctAnswer}`;
        feedbackElement.textContent += `\nFeedback: ${result.feedback}`;
        feedbackElement.classList.add("incorrect");
      }
    });
  
    // Disable the submit button and update the score display
    document.getElementById("submitButton").disabled = true;
    document.getElementById("scoreValue").textContent = `${userScore}/${results.length}`;
    // Store the user score in localStorage
    localStorage.setItem("score", `${userScore}/${results.length}`);
  } 
  catch (error) {
    // Log any errors that occur during the process of checking answers
    console.error("Error checking answers:", error);
  }  
}


async function quizUploadHandler() {
  // Retrieve values from form inputs
  var question = document.getElementById("questionName").value;
  var optionOne = document.getElementById("optionOne").value;
  var optionTwo = document.getElementById("optionTwo").value;
  var optionThree = document.getElementById("optionThree").value;
  var optionFour = document.getElementById("optionFour").value;
  var correctAnswerOptionId = document.getElementById("correctAnswer").value;
  var correctAnswer = document.getElementById(correctAnswerOptionId).value;
  var feedback = document.getElementById("feedback").value;

  // Construct object with form data
  var formData = {
      question: question,
      options: [optionOne, optionTwo, optionThree, optionFour],
      correctanswer: correctAnswer,
      feedback: feedback
  };

 
  console.log(formData);
  const response = await fetch(`http://localhost:3000/api/v1/questions` , {
    method:'POST',
    headers:{
      "content-type":"application/json"
    },
    body:JSON.stringify({data:formData}),
  });
  console.log(response)
 if(response.status === 201){
  alert("Quiz added")
 }
 else{
  alert("Quiz not uploaded")
 }

}
