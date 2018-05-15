import { getUserIdFromSocketId } from "../util/getUserIdFromSocketId";
import { addToRoom } from "../util/addToRoom";
import * as rootActions from "../../../src/actions/rootActions";
import { log } from "../../log";
import { sendToUser } from "../util/sendToSocketUser";
import * as sharedConstants from "../../../src/constants/sharedConstants";
import { getClientSafeBoosterDraftState } from "../boosterDraft/getClientSafeBoosterDraftState";
import { getPlayerIndexById } from "../boosterDraft/util/getPlayerIndexById";

export const sendDraftStateToClient = (state, resumeDraft, socket, socketIdToUserMap, draftToSocketIdMap) => {
  if (!resumeDraft) {
    log("Error! Did not find draft (sendDraftStateToClient)");
    return;
  }
  var draftId = resumeDraft.name;
  var currentUserId = getUserIdFromSocketId(socketIdToUserMap, socket.id);
  log("sendDraftStateToClient - currentUserId:" + currentUserId);

  //IMPORTANT we actually do want != instead of !== here because for some dumb reason currentUserId is an object of a number.
  //the lax comparison gets it right here. JS - the bad parts.
  if (
    resumeDraft.ownerId &&
    resumeDraft.inviteeId &&
    resumeDraft.ownerId != currentUserId &&
    resumeDraft.inviteeId != currentUserId
  ) {
    log("closed draft");
    log("ownerId: " + resumeDraft.ownerId);
    log("inviteeId: " + resumeDraft.inviteeId);
    log("currentUserId: " + currentUserId);
    sendToUser(socket, {
      type: rootActions.DRAFT_CLOSED,
      data: {}
    });
    return;
  }

  //TODO: seeing extra emits from server with states when doing new draft starts.
  //It has to do with route-triggered actions, see notes in main.js
  if (resumeDraft.ownerId != currentUserId && !resumeDraft.inviteeId) {
    log("SET INVITEE = " + currentUserId);
    resumeDraft.inviteeId = currentUserId;
    resumeDraft.player2Id = currentUserId;
  }
  resumeDraft.save(function(err, draft) {
    if (err) {
      return console.error(err);
    }
  });

  const newState = resumeDraft;
  state[draftId] = newState;

  if (resumeDraft.draftType === sharedConstants.BOOSTER_TYPE) {
    var currentUserId = getUserIdFromSocketId(socketIdToUserMap, socket.id);
    const playerIndex = getPlayerIndexById(resumeDraft.playerInfoArr, currentUserId);
    const clientSafeDraftState = getClientSafeBoosterDraftState(resumeDraft, playerIndex);

    sendToUser(socket, {
      type: rootActions.STATE_UPDATE,
      data: clientSafeDraftState
    });
  } else {
    sendToUser(socket, {
      type: rootActions.STATE_UPDATE,
      data: newState
    });
  }
};
