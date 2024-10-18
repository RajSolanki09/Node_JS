const User = require("../model/user.model")

const getUser = async (req, res) => {
    let data = await User.find()
    res.send(data)
}

const postUser = async (req, res) => {
    let data = await User.create(req.body)
    res.send(data)
}

module.exports = { getUser, postUser }