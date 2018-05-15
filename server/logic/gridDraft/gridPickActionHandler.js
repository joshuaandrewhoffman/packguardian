import { log } from "../../log";
import * as rootActions from "../../../src/actions/rootActions";
import * as gridDraftActions from "../../../src/routes/GridDraft/actions/gridDraftActions";
import { getRoomFromUser } from "../util/getRoomFromUser";
import { getCurrentUserPlayerNum } from "../util/getCurrentUserPlayerNum";
import { getPlayerNumForGridAndPick } from "./getPlayerNumberForGridAndPick";
import { handleRowPick } from "./rowPick";
import { handleColPick } from "./colPick";
import { sendToRoom } from "../util/sendToRoom";
import { sendToUser } from "../util/sendToSocketUser";
import { notifyGridOpponent } from "./notifyGridOpponent";

export const gridPickActionHandler = (
  Draft,
  state,
  socket,
  action,
  currentUserId,
  loggedInUserToSocketIdMap,
  draftToSocketIdMap
) => {
  var draftRoom = getRoomFromUser(draftToSocketIdMap, socket.id);
  var draftState = state[draftRoom];
  //check if we should even be able to rowPick
  var currUserPlayerNum = getCurrentUserPlayerNum(draftState, currentUserId);
  var playerPick = getPlayerNumForGridAndPick(draftState.packNum, draftState.pick);
  if (currUserPlayerNum !== playerPick) {
    //ideally want to let the frontend do this instead!
    sendToUser(socket, {
      type: rootActions.NOT_YOUR_TURN,
      data: {}
    });
    return;
  }

  //TODO: refactor name
  const newState = action.type === gridDraftActions.PICK_ROW
    ? handleRowPick(action.data, draftState)
    : handleColPick(action.data, draftState);

  state[draftRoom] = newState;

  Draft.update(
    {
      name: draftState.name
    },
    newState,
    function(err, obj) {
      if (err) return handleError(err);
      sendToRoom(socket, draftState.name, draftToSocketIdMap, {
        type: rootActions.STATE_UPDATE,
        data: newState
      });

      notifyGridOpponent(newState, loggedInUserToSocketIdMap, playerPick);
    }
  );
};
