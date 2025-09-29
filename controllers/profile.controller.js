const ProfileModel = require("../model/profile.model");

const getMyProfile = async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateMyProfile = async (req, res) => {
  try {
    const updates = req.body; // { name, bio, phone, avatar... }
    const profile = await ProfileModel.findOneAndUpdate(
      { user: req.user.id },
      updates,
      { new: true }
    );
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json({ message: "Profile updated", profile });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getMyProfile, updateMyProfile };
