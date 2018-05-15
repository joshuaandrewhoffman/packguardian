const _ = require("lodash");

const removeFromRoom = function(draftToSocketIdMap, room, user) {
  draftToSocketIdMap[room] = _.difference(draftToSocketIdMap[room], [user]);
  return draftToSocketIdMap;
};

module.exports = removeFromRoom;
