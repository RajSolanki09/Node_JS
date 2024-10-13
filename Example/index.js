const express = require('express')
const app = express()

app.get('/node', (req, res) => {
    res.send("Welcome To Node");
})


app.listen(6677, () => {
    console.log("listening on http://localhost:6677");
})