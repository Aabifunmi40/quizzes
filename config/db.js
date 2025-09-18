const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    const url = process.env.MONGO_URI || `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`;

    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ An error occurred while connecting:", err.message);
    process.exit(1);
  }
};

module.exports = connectToDb;
