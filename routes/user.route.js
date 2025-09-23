const express = require("express");
const {Signup, signIn}= require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.route("/signup").post(Signup);
userRouter.route("/signin").post(signIn)

module.exports= userRouter;