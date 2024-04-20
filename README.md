# Quiz App :
A simple web application for conducting quizzes.

## Description :
This project is a web-based quiz application built using Node.js, Express.js, and MongoDB for the backend, and HTML, CSS, and JavaScript for the frontend. It allows users to answer quiz questions and provides feedback on their answers.

## Requirements

Node.js installed on your machine.You can download it from [here](https://nodejs.org/en/download).

## Features

- Users can enter their username to start the quiz.
- Questions are displayed one at a time, and users can select their answers.
- After answering all questions, users can submit their answers to see their score and feedback.
- User scores are saved in the browser's local storage for future reference

## Installation: 
1. Clone the repository:
```bash
git clone https://github.com/AakashSuresh2003/Quiz_App.git
```
2. Install dependencies:
```bash
npm install
```
3. Start the server:
```bash
npm start
```
4. Open a web browser and navigate to http://localhost:3000 to access the application.

## API Endpoints:
1. GET /questions: Retrieves all questions from the quiz.
2. GET /questions/:id: Retrieves a specific question by its ID.
3. POST /questions: Creates a new question in the quiz.
4. PUT /questions/:id: Updates an existing question by its ID.
5. DELETE /questions/:id: Deletes a question by its ID.
6. POST /check-answer: Checks the submitted answers against the correct answers.

## Deployment
The application is deployed and can be accessed [here](https://quiz-app-three-phi.vercel.app).
