const mongoose = require("mongoose");
const CardSchema = require("./card");

//note that currentPacksByPlayer.length should always equal playerCount
//also, currentPacksByPlayer should only be sent to the client who owns that array index i.e. [0] for P1
//and you should only ever send the first pack i.e. currentPacksByPlayer[0][0] to P1
const BoosterDraftSchema = new mongoose.Schema({
  _id: String,
  cubeName: String,
  name: String,
  draftType: String,
  playerCount: Number,
  cube: [CardSchema],
  pickedCardsByPlayer: [[CardSchema]],
  currentPacksByPlayer: [
    [
      {
        index: Number,
        key: String,
        cards: [CardSchema]
      }
    ]
  ],
  roundNum: Number,
  ownerId: String,
  playerInfoArr: [
    {
      nickname: String,
      email: String,
      id: String
    }
  ]
});

module.exports = BoosterDraftSchema;
