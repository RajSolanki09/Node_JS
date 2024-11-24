const { default: mongoose } = require('mongoose')

require('dotenv').config()
const dbconnect = async () => {
    await mongoose.connect(/*DB_Url*/'mongodb+srv://solankiraj9642:node@cluster0.sncpu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    console.log('connected to db')
}
module.exports = dbconnect