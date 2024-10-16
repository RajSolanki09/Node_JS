
const { default: mongoose } = require('mongoose')
const mongose = require('mongoose')
const dbConnect = async () => {
    await mongoose.connect("mongodb+srv://solankiraj9642:node@cluster0.4isrz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
}   
console.log("connected to db");
module.exports = dbConnect
