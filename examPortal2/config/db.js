const { default: mongoose } = require("mongoose")

const connectDB = async () => {
    await mongoose.connect("mongodb://localhost:27017/ExamPortal_2")
    console.log("Database connected")
}
module.exports = connectDB