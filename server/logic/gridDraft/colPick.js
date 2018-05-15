import { getPlayerNumForGridAndPick } from "./getPlayerNumberForGridAndPick";
import _ from "lodash";
const copy = require("../../jsonCopy");
const makeNewGridPackStateBlob = require("./makeNewGridPackStateBlob");

//TODO: HARD_TO_READ

export const handleColPick = function(col, state) {
  //TODO: double check whether picks show multiples on right panel

  //Make picks
  var currPicks = [];
  for (var row of state.currentPack) {
    currPicks.unshift(row.cards[col]);
  }
  currPicks = _.filter(currPicks, function(card) {
    return !card.picked;
  });
  currPicks = _.reverse(currPicks);

  //Hide picks in pack
  var retCurrPack = [];
  var retPackRowIndex = 0;
  for (var row of state.currentPack) {
    var updatedCard = copy(row.cards[col]);
    updatedCard.picked = true;
    var newCards = _.concat(row.cards.slice(0, col), updatedCard, row.cards.slice(col + 1));

    var retRow = copy(row);
    retRow.cards = newCards;
    retCurrPack[retPackRowIndex] = retRow;
    retPackRowIndex++;
  }

  //increment state.pick
  var retPickNum = state.pick + 1;
  var playerPick = getPlayerNumForGridAndPick(state.packNum, state.pick);

  //get fresh pack if 2 picks have already been made
  //i.e. state.pick is an even number
  //also put into player 2's picks
  if (state.pick % 2 != 1) {
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
