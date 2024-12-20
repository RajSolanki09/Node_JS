const { Router } = require("express");
const {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getLoginPage,
  getSignupPage,
  login,
} = require("../controllers/user.controller");

const userRouter = Router();
const passport = require("passport");

// pages
userRouter.get("/login", getLoginPage);
userRouter.get("/signup", getSignupPage);
userRouter.get("/", getUser);
userRouter.get("/:userId", getUserById);
userRouter.post("/", createUser);
userRouter.patch("/:userId", updateUser);
userRouter.delete("/:userId", deleteUser);
userRouter.post("/login", login);
userRouter.post("/login", passport.authenticate("local"),(req,res)=>{
  res.send("logged in");
});

module.exports = userRouter;
