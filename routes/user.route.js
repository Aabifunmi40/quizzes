const express = require("express");
const {Signup, signIn}= require("../controller/user.controller");

const userRouter = express.Router();

userRouter.route("/signup").post(Signup);
userRouter.route("/signin").post(signIn)

module.exports= userRouter;