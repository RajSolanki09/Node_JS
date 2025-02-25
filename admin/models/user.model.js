const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  img: String,
  role: {
    type: String,
    enum: ["superadmin", "admin", "user"],
    
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },  
});

const User = mongoose.model("User", userSchema);
module.exports = User;
