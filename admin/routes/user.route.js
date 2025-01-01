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
  getAdmins,
  sendMail,
} = require("../controllers/user.controller");
const passport = require("passport");
const { isLoggedIn } = require("../middlewares/isLogin");
const { isSuperadmin } = require("../middlewares/role");

const userRouter = Router();
userRouter.get("/admin-list", isLoggedIn, isSuperadmin, getAdmins);
// pages
userRouter.get("/login", getLoginPage);
userRouter.get("/signup", getSignupPage);
userRouter.get("/", getUser);
userRouter.get("/:userId", getUserById);
userRouter.post("/", createUser);
userRouter.patch("/:userId", updateUser);
userRouter.delete("/:userId", deleteUser);
// userRouter.post("/login", login);
userRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/user/login",
    successRedirect: "/",
  })
);


// mail routes

userRouter.post("/mail", sendMail)

module.exports = userRouter;