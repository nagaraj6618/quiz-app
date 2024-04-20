// Importing the Quiz model
const Quiz = require("../models/quiz.model");

// Controller function to get all questions
const getAllQuestions = async (req, res) => {
  try {
    // Fetch all questions from the database
    const allQuestions = await Quiz.find();
    // Check if there are no questions or if the fetched array is empty
    if (!allQuestions || allQuestions.length === 0)
      throw new Error("Error fetching allQuestions");
    // Send the fetched questions as a JSON response
    res.status(200).json(allQuestions);
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error("Error fetching question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to get a question by its ID
const getQuestionById = async (req, res) => {
  try {
    // Extract the ID of the question from the request parameters
    const { id } = req.params;
    // Find the question in the database by its ID
    const question = await Quiz.findById(id);
    // Check if the question exists
    if (!question) throw new Error("Error fetching question");
    // Send the fetched question as a JSON response
    res.status(200).json(question);
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error("Error fetching question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to create a new question
const createNewQuestion = async (req, res) => {
  try {
    // Create a new question using the data from the request body
    console.log(req.body.data)
    const newQuestion = await Quiz.create(req.body.data);
    // Check if the new question was created successfully
    if (!newQuestion) {
      return res.status(404).json({ error: "No data found" });
    }
    // Save the new question to the database
    await newQuestion.save();
    // Log the creation of the new question
    console.log("New quiz question created:", newQuestion);
    // Send a success message as a JSON response
    res.status(201).json({ message: "Quiz question created successfully" });
  } catch (err) {
    // Handle errors and send an appropriate response
    console.error("Error creating quiz question:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to update an existing question
const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const updateQuiz = req.body;
  try {
    // Find and update the question in the database by its ID
    const updatedQuiz = await Quiz.findByIdAndUpdate(id, updateQuiz, {
      new: true,
    });
    // Check if the question was updated successfully
    if (!updatedQuiz) throw new Error("Error updating the quiz");
    // Send the updated question as a JSON response
    res.status(200).json(updatedQuiz);
  } catch (err) {
    // Handle errors and send an appropriate response
    console.error("Error updating quiz:", error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

// Controller function to delete a question by its ID
const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    // Find and delete the question in the database by its ID
    const deleteQuiz = await Quiz.findByIdAndDelete(id);
    // Check if the question was deleted successfully
    if (!deleteQuiz) throw new Error("Error deleting the Quiz");
    // Send the deleted question as a JSON response
    res.status(200).json(deleteQuiz);
  } catch (err) {
    // Handle errors and send an appropriate response
    res.status(500).json("Internal server Error");
  }
};

// Controller function to check the submitted answers against the correct answers
const checkAnswer = async (req, res) => {
  try {
    // Extract the data containing submitted answers from the request body
    const data = req.body.data;
    // Perform operations on each submitted answer using Promise.all
    const result = await Promise.all(data.map(async (element) => {
      try {
        // Find the question in the database by its ID
        const elementData = await Quiz.findById(element._id);
        // Compare the submitted answer with the correct answer
        const isCorrect = element.selectedAnswer === elementData.correctanswer;
        // Construct the result object containing correctness status and feedback
        return {
          _id: elementData._id,
          isCorrect: isCorrect,
          correctAnswer: elementData.correctanswer,
          feedback: elementData.feedback
        };
      } catch (err) {
        throw err;
      }
    }));
    // Log the result for debugging purposes
    console.log(result);
    // Send the result as a JSON response
    res.status(200).json(result);
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error("Error checking answer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Export all controller functions for use in the router
module.exports = {
  getAllQuestions,
  getQuestionById,
  createNewQuestion,
  updateQuestion,
  deleteQuestion,
  checkAnswer,
};
