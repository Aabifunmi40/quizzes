const Profile = require("../model/profile.model");

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }

    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }

    const { name, email, username, bio, profilePicture } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId },
      { name, email, username, bio, profilePicture },
      { new: true, upsert: true }
    );

    res.json(profile);
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

module.exports = { getProfile, updateProfile };
