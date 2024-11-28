const mongoose = require('mongoose')

const DB = async () => {
    await mongoose.connect('mongodb://localhost:27017/db')
    console.log('connect to DB');
}

module.exports = DB