import { getPlayerNumForGridAndPick } from "./getPlayerNumberForGridAndPick";
import { notifyUser } from "../oneSignal/notifyUser";
import { log } from "../../log";

//TODO: see if we can trim down the amount of state we pass here a bit
export const notifyGridOpponent = (newState, loggedInUserToSocketIdMap, playerPick) => {
  var newPlayerPick = getPlayerNumForGridAndPick(newState.packNum, newState.pick);
  var playerIdToNotify = newPlayerPick === 1 ? newState.player1Id : newState.player2Id;
  var playerToNotifyIsCurrentlyOnline = loggedInUserToSocketIdMap[playerIdToNotify] !== undefined &&
    loggedInUserToSocketIdMap[playerIdToNotify] !== null;
  log("{ nPid: " + playerIdToNotify + ", playerToNotifyIsCurrentlyOnline: " + playerToNotifyIsCurrentlyOnline + "}");
  if (newPlayerPick !== playerPick && !playerToNotifyIsCurrentlyOnline) {
    var notificationMessage = "Your turn to make a pick in " + draftState.name;
    //TODO changeme to be smart enough to know if we're running locally or on prod
    var url = "http://localhost:3000/gridDraft/" + draftState.name;

    notifyUser(playerIdToNotify, notificationMessage, url);
  }
};
