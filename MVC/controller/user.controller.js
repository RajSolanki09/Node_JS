const User = require("../model/user.model")

const getUser = async (req, res) => {
    let data = await User.find()
    res.send(data)
}

//Sign Up
const postUser = async (req, res) => {
    let { email, userName, password } = req.body
    let isExist = await User.findOne({ email })
    if (isExist) {
        return res.send({ MSG: "Email Already Exist" })
    } else {
        let data = await User.create(req.body)
        res.send(data)
    }
}

// Log in
const login = async (res, req) => {
    let { email, password } = req.body
    let isExist = await User.findOne({ email })
    if (!isExist) {
        return res.send({ MSG: "Email not Found !!" })
    }
    if (isExist.password != password) {
        return res.send({ MSG: "Password is Wrong !!" })
    }
    res.send({
        MSG: "SuccessFull Login",
        user: isExist
    })
}

module.exports = { getUser, postUser, login }