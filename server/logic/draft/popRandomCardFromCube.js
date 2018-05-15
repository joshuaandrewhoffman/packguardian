
const popRandomCardFromCube = cube => {
   //DO NOT USE THIS ON CUBE stores. It modifies in place!!!
   var i = Math.floor(Math.random() * cube.length);
   var poppedCard = cube[i];
   cube.splice(i, 1);
   return poppedCard;
 };

module.exports = popRandomCardFromCube;
