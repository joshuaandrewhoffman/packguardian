export const getCurrentUserPlayerNum = function(draftState, currentUserId) {
  //IMPORTANT we actually do want != instead of !== here because
  //for some dumb reason currentUserId is an object of a number.
  //the lax comparison gets it right here. JS - the bad parts.
  if (currentUserId == draftState.player1Id) {
    return 1;
  } else if (currentUserId == draftState.player2Id) {
    return 2;
  }
  console.log("ERROR! draftState did not match either owner or invitee for Id " + currentUserId);
  return -1;
};
