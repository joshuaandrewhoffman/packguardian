import _ from "lodash";

export const getRoomFromUser = function(draftToSocketIdMap, userSocketId) {
  var roomContainingUserSocketId = _.findKey(draftToSocketIdMap, function(usids) {
    return _.find(usids, function(usid) {
      var ret = usid === userSocketId;
      return ret;
    });
  });

  return roomContainingUserSocketId;
};
