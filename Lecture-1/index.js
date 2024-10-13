const express = require('express');
const dbConnect = require('./db');
const User = require('./user.model');
const app = express()

app.listen(8090, () => {
    console.log("Server is running on port 8090");
    dbConnect
})

app.get("/", async (req, res) => {
    let data = await User.find()
    res.send(data)
})

app.post("/", async (req, res) => {
    let data = await User.create(req.body)
    res.send(data)
})

app.use(express.json())