import { getRoomFromUser } from "../util/getRoomFromUser";
import { getPlayerIndexById } from "./util/getPlayerIndexById";
import { getNextPlayerIndex } from "./util/getNextPlayerIndex";
import _ from "lodash";
import { getClientSafeBoosterDraftState } from "./getClientSafeBoosterDraftState";
import { sendToUser } from "../util/sendToSocketUser";
import * as rootActions from "../../../src/actions/rootActions";

export const boosterPickActionHandler = (
  BoosterDraft,
  state,
  socket,
  action,
  userId,
  loggedInUserToSocketIdMap,
  draftToSocketIdMap
) => {
  console.log("BDRAFT pick card");
  const draftRoom = getRoomFromUser(draftToSocketIdMap, socket.id);
  const draftState = state[draftRoom];
  const playerIndex = getPlayerIndexById(draftState.playerInfoArr, userId);
  const currPack = draftState.currentPacksByPlayer[playerIndex][0];

  //get all cards except the picked card
  const restOfPack = _.filter(currPack.cards, card => {
    return card.id !== action.data._id;
  });
  currPack.cards = restOfPack;

  //remove this pack from our packs pile
  draftState.currentPacksByPlayer[playerIndex] = _.drop(draftState.currentPacksByPlayer[playerIndex], 1);

  //put new card into picks pile
  draftState.pickedCardsByPlayer[playerIndex] = [...draftState.pickedCardsByPlayer[playerIndex], ...[action.data]];

  //pass pack to the next player
  const passToPlayerIndex = getNextPlayerIndex(draftState, playerIndex);
  draftState.currentPacksByPlayer[passToPlayerIndex] = [
    ...draftState.currentPacksByPlayer[passToPlayerIndex],
    ...[currPack]
  ];

  //save our changes to db
  BoosterDraft.update(
    {
      name: draftState.name
    },
    draftState,
    function(err, obj) {
      //TODO: WRITE THESE handleError() METHODS EVERYWHERE!!!
      if (err) return handleError(err);

      //update for the picking player
      const playerIndex = getPlayerIndexById(draftState.playerInfoArr, userId);
      const clientSafeDraftState = getClientSafeBoosterDraftState(draftState, playerIndex);
      sendToUser(socket, {
        type: rootActions.STATE_UPDATE,
        data: clientSafeDraftState
      });

      //update for the player receiving a new pack

    console.log("time to figure out p2+");
/*
  //JAH TODO: this is where work on booster draft will resume after all the cleanup is done

      const playerIndex2 = getPlayerIndexById(draftState.playerInfoArr, userId);
      const clientSafeDraftState2 = getClientSafeBoosterDraftState(draftState, playerIndex2);
      const socket2 =
      sendToUser(socket2, {
        type: rootActions.STATE_UPDATE,
        data: clientSafeDraftState2
      });*/
    }
  );
};
