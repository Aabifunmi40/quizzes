
const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { getProfile, updateProfile } = require("../controllers/profile.controller");

const profileRouter = express.Router();

profileRouter.get("/", authMiddleware, getProfile);
profileRouter.put("/", authMiddleware, updateProfile);

module.exports = profileRouter;
