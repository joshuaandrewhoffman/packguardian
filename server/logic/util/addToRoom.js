import _ from "lodash";

export const addToRoom = function(draftToSocketIdMap, room, user) {
  //Remove from all other rooms the user may be in
  draftToSocketIdMap = _.mapValues(draftToSocketIdMap, function(roomUsers) {
    return _.difference(roomUsers, [user]);
  });

  //Add to the room that matters
  draftToSocketIdMap[room] = _.union(draftToSocketIdMap[room], [user]);
  return draftToSocketIdMap;
};
