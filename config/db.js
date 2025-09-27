const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    const url = process.env.MONGO_URI;
    console.log("🔎 MONGO_URI value:", url ? "loaded ✅" : "undefined ❌");

    if (!url) {
      throw new Error("MONGO_URI is missing from environment variables");
    }

    await mongoose.connect(url); // no need for extra options anymore
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ An error occurred while connecting to DB:", err.message);
  }
};

module.exports = connectToDb;
