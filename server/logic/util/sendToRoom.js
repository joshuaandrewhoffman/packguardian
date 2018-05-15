import _ from "lodash";

export const sendToRoom = function(socket, room, draftToSocketIdMap, data) {
  const usersArr = draftToSocketIdMap[room];
  _.each(usersArr, function(user) {
    socket.server.sockets.in(user).emit("action", data);
  });
};
