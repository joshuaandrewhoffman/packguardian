//tiny util just to make this less error prone - we do it a lot!

export const getUserIdFromSocketId = (socketIdToUserMap, socketId) => {
  return socketIdToUserMap[socketId].id.toString();
};
