const { Router } = require("express");
const { loginPage, signupPage, createUser, login, getUser } = require("../controller/user.controller");
const userRouter = Router();

userRouter.get("/login", loginPage);
userRouter.get("/signup", signupPage);
userRouter.post("/signup", createUser);
userRouter.get("/", getUser);
userRouter.post("/login", login);

module.exports = userRouter;    