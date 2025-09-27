const Profile = require("../model/profile.model");

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { username, bio, profilePicture } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      { username, bio, profilePicture },
      { new: true, upsert: true }
    );

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

module.exports = { getProfile, updateProfile };
