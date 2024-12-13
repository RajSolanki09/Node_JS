const { Router } = require("express");
const { getLoginPage, getSignUpPage, getUser, login, createUser } = require("../controller/userController");
const userRouter = Router();

userRouter.get("/login", getLoginPage);
userRouter.get("/signup", getSignUpPage);
userRouter.post("/signup", createUser);
userRouter.get("/", getUser);
userRouter.post("/login", login);
module.exports = userRouter;
