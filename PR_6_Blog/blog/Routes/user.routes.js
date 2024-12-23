const { Router } = require("express");
const User = require("../Models/user.schema");
const {
  loginPage,
  signupPage,
  signup,
  login,
  deleteUser,
} = require("../Controllers/user.controllers");

const UserRouter = Router();

UserRouter.get("/login", loginPage);

UserRouter.get("/signup", signupPage);

UserRouter.post("/signup", signup);

UserRouter.post("/login", login);

UserRouter.delete("/users/:id", deleteUser);

module.exports = UserRouter;
