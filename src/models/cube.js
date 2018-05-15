const mongoose = require("mongoose");
const CardSchema = require("./card");

const CubeSchema = new mongoose.Schema({
  name: String,
  cube: [CardSchema]
});

module.exports = CubeSchema;
//mongoose.model('Cube', CubeSchema);
