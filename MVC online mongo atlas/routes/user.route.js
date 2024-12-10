const { Router } = require('express')
const { getUser, postUser, login } = require('../controller/user.controller')
const userRouter = Router()

userRouter.get("/", getUser)
userRouter.post("/login",login)

userRouter.post("/", postUser)

module.exports = userRouter