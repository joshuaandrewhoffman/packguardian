import _ from "lodash";
import { log } from "../../log";
import { getUserIdFromSocketId } from "../util/getUserIdFromSocketId";
import { addToRoom } from "../util/addToRoom";
import { sendToRoom } from "../util/sendToRoom";
import { sendToUser } from "../util/sendToSocketUser";
import { getPlayerIndexById } from "./util/getPlayerIndexById";
import { getClientSafeBoosterDraftState } from "./getClientSafeBoosterDraftState";
import * as rootActions from "../../../src/actions/rootActions";

//TODO: refactor me - we shouldn't be conflating these two things
//instead, we should do the relevant setup / null checking / etc
//and then run two methods - i.e. addIfWeShould(); and then sendStateToClient();
export const addUserAndSendBoosterDraftStateToClient = (resumeDraft, socket, socketIdToUserMap, state, draftToSocketIdMap) => {
  if (!resumeDraft) {
    log("Error! Did not find draft (main/addUserAndSendBoosterDraftStateToClient)");
    return;
  }
  if (!resumeDraft.playerInfoArr) {
    log("Error! malformed draft object");
    return;
  }
  var draftId = resumeDraft.name;

  var currentUserId = getUserIdFromSocketId(socketIdToUserMap, socket.id);
  var playerIdsInDraft = _.map(resumeDraft.playerInfoArr, function(playerInfo) {
    return playerInfo.id;
  });

  var userIsInRoom = currentUserId && _.indexOf(playerIdsInDraft, currentUserId.toString()) > -1;

  if (!userIsInRoom && resumeDraft.playerInfoArr.length === resumeDraft.playerCount) {
    //If draft is full
    log("closed draft");
    //  log("currentUserId: " + currentUserId);
    sendToUser(socket, {
      type: rootActions.DRAFT_CLOSED,
      data: {}
    });
    return;
  } else if (!userIsInRoom && resumeDraft.playerInfoArr.length < resumeDraft.playerCount) {
    var currentUserInfo = socketIdToUserMap[socket.id];

    //If we should add this player
    resumeDraft.playerInfoArr.push(currentUserInfo);
    resumeDraft.save(function(err, draft) {
      if (err) {
        return console.error(err);
      }
    });
    //we'll send this data to the user below
    //DO NOT do the next block in an else{}
  }

  //If neither of the above cases, it's just a normal state update
  const newServerState = resumeDraft;
  state[draftId] = newServerState;
  const playerIndex = getPlayerIndexById(resumeDraft.playerInfoArr, currentUserId);
  const newClientState = getClientSafeBoosterDraftState(resumeDraft, playerIndex);

  log("sending state to " + currentUserId);

  //TODO: this update doesn't seem to hit the client when loading an existing bdraft via typing url + enter key
  //it works for grid draft
  //I suspect it's because of timing, and that even grid isn't guaranteed to work
  //either need to hack in an artificial delay or ensure the event waits for auth (assuming that's the issue)
  sendToUser(socket, {
    type: rootActions.STATE_UPDATE,
    data: newClientState
  });

  //We still want to add all players to a room in the booster case.
  //Generally we'll be sending updates direct to players
  //However, there may be cases where we need to notify all players!
  draftToSocketIdMap = addToRoom(draftToSocketIdMap, draftId, socket.id);

  //if the room just filled, we need to let everyone know!
  //(tbh we probably want to update the roster any time anyone joins, but that's TODO)
  if (resumeDraft.playerInfoArr.length === resumeDraft.playerCount) {
    //send only the playerInfo, we should just be doing appends to our state
    sendToRoom(socket, newServerState.name, draftToSocketIdMap, {
      type: rootActions.STATE_UPDATE,
      data: { playerInfoArr: newServerState.playerInfoArr }
    });
  }
}
