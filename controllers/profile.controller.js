const Profile = require("../model/profile.model");

const getProfile = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }

    let profile = await Profile.findOne({ userId });

    // ✅ If no profile exists yet, return an empty object instead of 404
    if (!profile) {
      return res.json({
        userId,
        name: "",
        email: "",
        username: "",
        bio: "",
        profilePicture: "",
      });
    }

    res.json(profile);
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }

    const { name, email, username, bio, profilePicture } = req.body;

    // ✅ Create or update profile (upsert)
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
