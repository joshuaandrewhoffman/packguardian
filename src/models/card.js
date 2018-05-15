const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  number: Number,
  name: String,
  imageUrl: String,
  picked: Boolean //we only use this field in grid draft. We could make a card.js for booster, but fine for now.
});

module.exports = CardSchema;
//mongoose.model('Card', CardSchema);
