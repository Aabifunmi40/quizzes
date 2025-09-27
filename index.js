const express = require("express");
const connectToDb = require("./config/db");
const userRouter = require("./routes/user.route");
const quizRouter = require("./routes/quiz.route");
const resultRouter = require("./routes/result.route");
const profileRouter=require("./routes/profile.route")
require("dotenv").config();
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectToDb();

// Routes
app.use("/api/user", userRouter);   // Auth (signup/login)
app.use("/api/quiz", quizRouter);   // Quiz routes
app.use("/api/result", resultRouter); // Result routes
app.use("/api/profile", profileRouter)

// Default route
app.get("/", (req, res) => {
  res.send("Quiz API is running...");
});

// Error handling (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

// Server listen
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
