const { Router } = require('express')
const { model } = require('mongoose')
const { signup, login } = require('../controllers/userController')
const userRouter = Router()

userRouter.post('/users/signup', signup)

userRouter.post('/users/login', login)

module.exports = userRouter