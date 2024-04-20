const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz.model");
const {
  getAllQuestions,
  getQuestionById,
  createNewQuestion,
  updateQuestion,
  checkAnswer,
  deleteQuestion,
} = require("../controller/quiz.controller");

// Route to get all questions
router.get("/questions", getAllQuestions);

// Route to get a specific question by ID
router.get("/questions/:id", getQuestionById);

// Route to create a new question
router.post("/questions", createNewQuestion);

// Route to update an existing question by ID
router.put("/questions/:id", updateQuestion);

// Route to delete a question by ID
router.delete("/questions/:id", deleteQuestion);

// Route to check the submitted answers against the correct answers
router.post("/check-answer", checkAnswer);

module.exports = router;
