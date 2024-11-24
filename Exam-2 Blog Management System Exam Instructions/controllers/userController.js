const User = require("../model/user.model")

//Sign Up
const signup = async (req, res) => {
    let { name, email, password } = req.body
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
module.exports={signup,login}