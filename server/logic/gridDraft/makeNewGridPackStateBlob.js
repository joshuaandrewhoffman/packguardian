const copy = require("../../jsonCopy");
const log = require("../../log");
const popRandomCardFromCube = require("../draft/popRandomCardFromCube");

//TODO will want to make rows/cols configurable down the road to support weird grids :D
const makeNewGridPackStateBlob = function(state) {
  var rows = 3;
  var cols = 3;

  var currCube = copy(state.cube);
  var retPack = [];

  for (var rowIndex = 0; rowIndex < rows; rowIndex++) {
    var currRowCards = [];
    for (var colIndex = 0; colIndex < cols; colIndex++) {
      //get a random card from the pool
      var poppedCard = popRandomCardFromCube(currCube);
      currRowCards.push(poppedCard);
    }
    retPack.push({ index: rowIndex, key: "pick" + state.pick + "row" + rowIndex, cards: currRowCards });
  }

  return { pack: retPack, cube: currCube, packNum: state.packNum + 1 };
};

module.exports = makeNewGridPackStateBlob;
