import { combineReducers } from "redux";
import locationReducer from "./location";
import { combineForms } from "react-redux-form";

let socketReducer = function reducer(state = {}, action) {
  switch (action.type) {
    case "authSuccess":
      console.log("auth success!");
      let userId = action.data.socketUser._id;
      let userEmail = action.data.socketUser.local.email;
      let userSocketId = action.data.socketId;
      let user = {
        userId: userId,
        userEmail: userEmail,
        userSocketId: userSocketId
      };
      let toRet = { ...state, user: user };
      return toRet;
    default:
      return state;
  }

  //if somehow we didn't already... return state so we don't break the world :)
  return state;
};
const gridDraftMenu = require("../routes/GridDraft/modules/gridDraftMenu").default;
const gridDraftGameplay = require("../routes/GridDraft/modules/gridDraftGameplay").default;
const picksSidebar = require("../routes/GridDraft/modules/picksSidebar").default;
const boosterDraftMenu = require("../routes/BoosterDraft/modules/boosterDraftMenu").default;
const boosterDraftGameplay = require("../routes/BoosterDraft/modules/boosterDraftGameplay").default;

//TODO: fix this ridiculous naming on the draftStartForm...
const test = {
  draftType: "",
  playerCount: ""
};

//Setting up this root reducer is the standard way to do setup. See routes/index.js for the weird way to do it
export const makeRootReducer = asyncReducers => {
  const combine = combineForms({
    location: locationReducer,
    socket: socketReducer,
    gridDraftMenu: gridDraftMenu,
    gridDraftGameplay: gridDraftGameplay,
    picksSidebar: picksSidebar,
    boosterDraftMenu: boosterDraftMenu,
    boosterDraftGameplay: boosterDraftGameplay,
    test: test,
    ...asyncReducers
  });
  return combine;
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
