const { Router } = require("express");
const { getLoginPage, getSignupPage, getIndexPage, getResetPasswordPage, createUser, login, sendMail, sendOtp, verifyOtp } = require("../controllers/userController");
const userRouter = Router();

userRouter.get("/login", getLoginPage);
userRouter.get("/signup", getSignupPage);
userRouter.get("/index", getIndexPage);
userRouter.get("/reset-password", getResetPasswordPage);
userRouter.post("/signup", createUser);
userRouter.post("/login", login);

userRouter.post("/mail", sendMail);

// password reset routes

userRouter.post("/send-otp", sendOtp);
userRouter.post("/reset-password", verifyOtp);

module.exports = userRouter;
