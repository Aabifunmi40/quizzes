const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: { type: String, default: "" },      // ✅ Add this
    email: { type: String, default: "" },     // ✅ Add this
    username: { type: String, default: "" },
    bio: { type: String, default: "" },
    profilePicture: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
