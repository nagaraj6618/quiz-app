const env = require("dotenv");
env.config();

// Import required modules
const express = require("express");
const cors = require("cors");
const quizRouter = require("./router/quiz.router");
const connectDb = require("./database/db.config");

// Create an instance of Express
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse incoming JSON data

// Serve static files from the 'public' directory
app.use(express.static(__dirname + "/public"));

// Route to render the index.html file
app.get("/upload", (req, res) => {
  res.sendFile(__dirname+"/public/question.html");
});
app.get("/", (req, res) => {
  res.render("index.html");
});


// Connect to the database
connectDb();

// API Routes
app.use("/api/v1", quizRouter);

// Default route
app.get("/", (req, res) => {
  res.status(200).json({ Message: "Hello World" });
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server listening on PORT ${process.env.PORT}`);
});