export const getPlayerNumForGridAndPick = function(packNum, pickNum) {
  var oddGrid = packNum % 2;
  var oddPick = pickNum % 2;

  if (oddGrid) {
    if (oddPick) {
      return 1;
    } else {
      return 2;
    }
  } else {
    //evenGrid
    if (oddPick) {
      return 2;
    } else {
      return 1;
    }
  }
};
