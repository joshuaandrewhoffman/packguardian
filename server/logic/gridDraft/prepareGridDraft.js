import { log } from "../../log";
const guid = require("../util/guid");
const popRandomCardFromCube = require("../draft/popRandomCardFromCube");

//TODO: Do we *need* to pass the entire state blob here?
//can we do something smarter?

export const prepareGridDraft = function(Draft, state, currCube, cubeName, draftName, ownerId) {
  log("prepareGridDraftCalled");
  const startingPack = [
    {
      index: 0,
      key: "pick1row0",
      cards: [popRandomCardFromCube(currCube), popRandomCardFromCube(currCube), popRandomCardFromCube(currCube)]
    },
    {
      index: 1,
      key: "pick1row1",
      cards: [popRandomCardFromCube(currCube), popRandomCardFromCube(currCube), popRandomCardFromCube(currCube)]
    },
    {
      index: 2,
      key: "pick1row2",
      cards: [popRandomCardFromCube(currCube), popRandomCardFromCube(currCube), popRandomCardFromCube(currCube)]
    }
  ];

  var uuid = guid();
  state[uuid] = {
    _id: uuid,
    name: draftName,
    currentPack: startingPack,
    cube: currCube,
    pickedCardsP1: [],
    pickedCardsP2: [],
    pick: 1,
    packNum: 1
  };

  log("got ownerId " + ownerId);
  log("saving draft from cube name: " + cubeName);
  var draft = new Draft({
    _id: uuid,
    cubeName: cubeName,
    name: draftName,
    currentPack: startingPack,
    cube: currCube,
    pick: 1,
    packNum: 1,
    ownerId: ownerId,
    player1Id: ownerId
  });
  return draft;
};
