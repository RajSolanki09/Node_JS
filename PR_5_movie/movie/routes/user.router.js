const { Router } = require("express");
const { signup, login, deleteUser, getAllUsers } = require("../controllers/user.controller");

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.delete("/delete/:id", deleteUser);
userRouter.get("/", getAllUsers);

module.exports = userRouter;