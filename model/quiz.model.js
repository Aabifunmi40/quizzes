const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  number: { type: Number, required: true }, // Added for question numbering
  questionText: { type: String, required: true },
  options: [
    {
      text: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
});

const quizSchema = new mongoose.Schema({
  subject: {
    type: String,
    enum: ["Mathematics", "English", "Current Affairs"],
    required: true,
  },
  questions: [questionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Quiz", quizSchema);