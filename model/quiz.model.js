// models/quiz.model.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [
    {
      text: { type: String, required: true },
      isCorrect: { type: Boolean, required: true }
    }
  ]
});

const quizSchema = new mongoose.Schema({
  subject: {
    type: String,
    enum: ["Mathematics", "English", "Current Affairs"], // you can add more later
    required: true
  },
  questions: [questionSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const QuizModel = mongoose.model("Quiz", quizSchema);

module.exports = QuizModel;
