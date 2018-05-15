export const sendToUser = function(socket, data) {
  socket.server.sockets.in(socket.id).emit("action", data);
};
