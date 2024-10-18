const { default: mongoose } = require("mongoose")

require("dotenv").config()
const dbConnect = async () => {
    await mongoose.connect(process.env.DB_URL/*"mongodb+srv://solankiraj9642:node@cluster0.9jlzg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"*/)
}
console.log("bdconnect is connected");
module.exports = dbConnect