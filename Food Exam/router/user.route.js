const {Router} = require("express");
const { signupUser, loginUser, logoutUser } = require("../controller/user.controller");
const userRouter = Router();

userRouter.post("/users/signup", signupUser);
userRouter.post("/users/login", loginUser);
userRouter.post("/users/logout", logoutUser);

module.exports = userRouter;
