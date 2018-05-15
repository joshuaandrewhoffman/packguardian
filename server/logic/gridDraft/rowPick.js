import { getPlayerNumForGridAndPick } from "./getPlayerNumberForGridAndPick";
import _ from "lodash";
const copy = require("../../jsonCopy");
const makeNewGridPackStateBlob = require("./makeNewGridPackStateBlob");

//TODO: HARD_TO_READ

export const handleRowPick = function(row, state) {
  //Make picks
  var currPicks = _.filter(state.currentPack[row].cards, function(card) {
    return !card.picked;
  });
  var updatedRowCards = [];

  for (var card of state.currentPack[row].cards) {
    var updatedCard = copy(card);
    updatedCard.picked = true;
    updatedRowCards.unshift(updatedCard);
  }

  //Hide picks in pack
  var updatedRow = copy(state.currentPack[row]);
  updatedRow.cards = _.reverse(updatedRowCards);
  var retCurrPack = _.concat(state.currentPack.slice(0, row), updatedRow, state.currentPack.slice(row + 1));

  //increment state.pick
  var retPickNum = state.pick + 1;

  //get fresh pack if 2 picks have already been made
  //i.e. state.pick is an even number
  var playerPick = getPlayerNumForGridAndPick(state.packNum, state.pick);

  if (state.pick % 2 !== 1) {
    var retNewGridPackStateBlob = makeNewGridPackStateBlob(state);
    var toRet = copy(state);

    if (playerPick === 2) {
      var retpickedCardsP2 = _.concat(currPicks, state.pickedCardsP2);
      toRet.pickedCardsP2 = retpickedCardsP2;
    } else if (playerPick === 1) {
      var retpickedCardsP1 = _.concat(currPicks, state.pickedCardsP1);
      toRet.pickedCardsP1 = retpickedCardsP1;
    }

    toRet.currentPack = retNewGridPackStateBlob.pack;
    toRet.pick = retPickNum;
    toRet.cube = retNewGridPackStateBlob.cube;
    toRet.packNum = retNewGridPackStateBlob.packNum;
    return toRet;
  } else {
    var toRet = copy(state);
    if (playerPick === 2) {
      var retpickedCardsP2 = _.concat(currPicks, state.pickedCardsP2);
      toRet.pickedCardsP2 = retpickedCardsP2;
    } else if (playerPick === 1) {
      var retpickedCardsP1 = _.concat(currPicks, state.pickedCardsP1);
      toRet.pickedCardsP1 = retpickedCardsP1;
    }

    toRet.currentPack = retCurrPack;
    toRet.pick = retPickNum;
    return toRet;
  }
};
