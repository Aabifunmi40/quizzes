const UserModel = require("../model/user.model");
const ProfileModel =require("../model/profile.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    // ✅ Create profile automatically
    await ProfileModel.create({
      user: newUser._id,
      name,
      email,
    });

    return res.status(201).json({ message: "User and profile created" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};


// Signin (login)
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user with password field
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );

    // success response
    return res.json({
      message: "Sign in successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = { Signup, signIn };
