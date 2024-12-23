const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema({
  apptoplaylist: String
});

const Feature = mongoose.model("Feature", featureSchema);

module.exports = Feature;
