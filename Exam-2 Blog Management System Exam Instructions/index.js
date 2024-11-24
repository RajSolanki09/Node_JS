const express = require('express')
const dbconnect = require('./config/db')
const userRouter = require('./routes/user.router')
const app = express()
app.use(express.json())
app.use('/',userRouter)

app.listen(9090,()=>{
    console.log('server is running on port 9090')
    dbconnect()
})