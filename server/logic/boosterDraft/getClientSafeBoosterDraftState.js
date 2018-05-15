export const getClientSafeBoosterDraftState = (
  { currentPacksByPlayer, pickedCardsByPlayer, roundNum, cubeName, draftType, playerCount, playerInfoArr },
  playerIndex
) => {
  const currentPacksList = currentPacksByPlayer[playerIndex];
  var packsWaiting = currentPacksList.length - 1;
  if (packsWaiting < 0) {
    packsWaiting = 0;
  }
  const currentPack = currentPacksList[0];

  const clientSafeDraftState = {
    currentPack: currentPack,
    pickedCards: pickedCardsByPlayer[playerIndex],
    roundNum: roundNum,
    packsWaiting: packsWaiting,
    draftType: draftType,
    playerCount: playerCount,
    playerInfoArr: playerInfoArr
  };
  return clientSafeDraftState;
};
