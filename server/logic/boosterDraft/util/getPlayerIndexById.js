import _ from "lodash";

export const getPlayerIndexById = (playerInfoArr, playerId) => {
  return _.map(playerInfoArr, function(playerInfo) {
      return playerInfo.id;
    })
    .indexOf(playerId);
};
