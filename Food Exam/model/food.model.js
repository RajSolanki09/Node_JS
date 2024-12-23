const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    description: String,
    createdBy : String ,
    userId : String
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;