// models/result.model.js
const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  subject: {
    type: String,
    enum: ["Mathematics", "English", "Current Affairs"],
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const ResultModel = mongoose.model("Result", resultSchema);

module.exports = ResultModel;
