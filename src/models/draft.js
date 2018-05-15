const mongoose = require("mongoose");
const CardSchema = require("./card");

const DraftSchema = new mongoose.Schema({
  _id: String,
  name: String,
  cubeName: String,
  draftType: String,
  playerCount: Number,
  ownerId: String,
  inviteeId: String,
  player1Id: String,
  player2Id: String,
  currentPack: [
    {
      index: Number,
      key: String,
      cards: [CardSchema]
    }
  ],
  cube: [CardSchema],
  pickedCardsP1: [CardSchema],
  pickedCardsP2: [CardSchema],
  pick: Number,
  packNum: Number
});

module.exports = DraftSchema;
//mongoose.model('Draft', DraftSchema);
