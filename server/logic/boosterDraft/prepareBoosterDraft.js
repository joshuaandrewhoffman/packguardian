const log = require("../../log");
const guid = require("../util/guid");
const popRandomCardFromCube = require("../draft/popRandomCardFromCube");

const preparePackWithNCards = function(currCube, nCardsPerPack) {
  var cardsArr = [];
  for (var i = 0; i < nCardsPerPack; i++) {
    cardsArr[i] = popRandomCardFromCube(currCube);
  }
  return cardsArr;
};
/*
const prepareNPacks = function(currCube, nPacks) {
  var packs = [];
  for (var i = 0; i < nPacks; i++) {
    var key = "pack" + i;
    packs.push({
      index: i,
      set: setIndex,
      key: key,
      cards: preparePackWithNCards(currCube, 15)
    });
  }
  return packs;
};
*/
export const prepareBoosterDraft = function(
  BoosterDraft,
  state,
  currCube,
  cubeName,
  draftName,
  ownerInfo,
  draftType,
  playerCount,
  packSetCount
) {
  //playerCount === numPacks (in packSet)
  //packsPerPlayer === packSet === how many packs does each player get at the beginning
  //so for standard 24 pack 8x3 it's:
  //playerCount === numPacks === 8
  //packSets === 3

  //  const startingPacks = prepareNPacks(currCube, playerCount);
  const currentPacksByPlayer = [];
  for (var i = 0; i < playerCount; i++) {
    //index may not matter at all here, we'll see!
    const key = "roundNum" + 1 + "pack" + i;
    const pack = {
      index: i,
      key: key,
      cards: preparePackWithNCards(currCube, 15)
    };
    const packsForPlayer = [pack];
    currentPacksByPlayer.push(packsForPlayer);
  }

  const pickedCardsByPlayer = [];
  for (var i = 0; i < playerCount; i++) {
    pickedCardsByPlayer[i] = [];
  }
  //JAH TODO: this is NOT collision safe. Need to ensure that we solve for that
  var uuid = guid();
  state[uuid] = {
    _id: uuid,
    name: draftName,
    draftType: draftType,
    playerCount: playerCount,
    cube: currCube,
    pickedCardsByPlayer: pickedCardsByPlayer,
    currentPacksByPlayer: currentPacksByPlayer,
    roundNum: 1
  };

  var draft = new BoosterDraft({
    _id: uuid,
    cubeName: cubeName,
    name: draftName,
    draftType: draftType,
    playerCount: playerCount,
    cube: currCube,
    pickedCardsByPlayer: pickedCardsByPlayer,
    currentPacksByPlayer: currentPacksByPlayer,
    roundNum: 1,
    ownerId: ownerInfo.id,
    playerInfoArr: [ownerInfo]
  });
  return draft;
};
