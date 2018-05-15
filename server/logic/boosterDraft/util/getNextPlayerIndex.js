export const getNextPlayerIndex = (draftState, playerIndex) => {
  const numPlayers = draftState.playerInfoArr.length;
  if (playerIndex === numPlayers - 1) {
    return 0;
  } else {
    return playerIndex + 1;
  }
};
