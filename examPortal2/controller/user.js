const User = require("../models/user")

exports.createAdmin = async (req, res) => {
    let admin = await User.create(req.body);
    res.send(admin);
}

exports.createTeacher = async (req, res) => {
    let teacher = await User.create(req.body);
    res.send(teacher);
}

exports.createStudent = async (req, res) => {
    let student = await User.create(req.body);
    res.send(student);
}

exports.getUsers = async (req, res) => {
    let users = await User.find();
    res.send(users);
}
