const { Router } = require("express");
const { loginPage, signupPage, createUser, login, getUser } = require("../controller/user.controller");
const userRouter = Router();

userRouter.get("/login", loginPage);
userRouter.get("/signup", signupPage);
userRouter.post("/signup", createUser);
userRouter.post("/login", login);

userRouter.get("/", getUser);

module.exports = userRouter;    