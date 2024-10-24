const express = require('express')
const app = express()
app.use(express.json())

let db = []

app.get('/', (req, res) => {
    res.get(db)
})

app.post('/', (req, res) => {

    let { username, email, password } = req.body
    let user = {
        username,
        email,
        password,
        id: Date.now()
    }
    db.push(user)
    res.status(201).send(db)
})

app.delete('/:id', (req, res) => {
    let { id } = req.params
    let data = db.filter((ele) => ele.id != id)
    db = data
    res.status(200).send(db)
})

app.listen(8090, () => {
    console.log("port running in 8090");

})