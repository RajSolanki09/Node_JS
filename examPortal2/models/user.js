const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: { type: String, enum: ['admin', 'user', 'default'] },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    studentsId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const User = mongoose.model("User", userSchema);
module.exports = User;