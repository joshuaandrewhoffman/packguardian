const DraftSchema = require("../../src/models/draft");
const BoosterDraftSchema = require("../../src/models/boosterDraft");
const CardSchema = require("../../src/models/card");
const CubeSchema = require("../../src/models/cube");
import mongoose from "mongoose";

export const getMongooseModels = () =>{
  const Card = mongoose.model("Card", CardSchema);
  const Cube = mongoose.model("Cube", CubeSchema);
  const Draft = mongoose.model("Draft", DraftSchema);
  const BoosterDraft = mongoose.model("BoosterDraft", BoosterDraftSchema);
  const DraftModels = {
    Card,
    Cube,
    Draft,
    BoosterDraft
  };
  return DraftModels;
}
