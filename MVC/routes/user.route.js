const { Router } = require('express')
const User = require('../model/user.model')
const { getUser, postUser } = require('../controller/user.controller')
const userRouter = Router()

userRouter.get("/user", getUser)

userRouter.post("/user", postUser)

module.exports = userRouter


