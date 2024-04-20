const mongoose = require("mongoose");

// Define the schema for the quiz collection
const quizSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
    unique: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  feedback: {
    type: String,
    required: true,
  },
  correctanswer: {
    type: String,
    required: true,
  },
});

// Create the Quiz model using the schema
const Quiz = mongoose.model("Quiz", quizSchema);

// Export the Quiz model for use in other modules
module.exports = Quiz;
