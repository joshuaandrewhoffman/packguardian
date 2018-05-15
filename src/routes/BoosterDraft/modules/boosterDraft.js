import _ from "lodash";
import * as boosterDraftActions from "../actions/boosterDraftActions";
import * as rootActions from "../../../actions/rootActions";

// ------------------------------------
// Actions
// ------------------------------------
export const actions = {};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [boosterDraftActions.BOOSTER_DRAFT_INIT]: (state, action) => {
    console.log("got booster init");
    let toRet = { ...state, currentPack: action.data, startingDraft: false };
    console.log("set  startingDraft to false");
    return toRet;
  },
  [boosterDraftActions.BOOSTER_DRAFT_RESUME]: (state, action) => {
    console.log("booster resume called");
    return {};
  },
  [boosterDraftActions.BOOSTER_DRAFT_LIST_INIT]: (state, action) => {
    console.log("booster list init received!");
    let toRet = { ...state, boosterDraftList: action.data };
    return toRet;
  },
  [rootActions.STATE_UPDATE]: (state, action) => {
    console.log("state updated from server:");
    return { ...state, ...action.data, startingDraft: false, draftId: action.data.name };
  },
  [rootActions.DRAFT_CLOSED]: (state, action) => {
    alert("sorry, this draft is full.");
    return state;
  },
  [boosterDraftActions.RESET_BOOSTER_DRAFT_STATE]: (state, action) => {
    const initialState = { currentPack: {}, pickedCards: [], pick: 1, packNum: 1 };
    return initialState;
  },
  [rootActions.NOT_YOUR_TURN]: (state, action) => {
    //TODO: figure out what needs to happen for "not your turn" notis in bdrafts
    alert("sorry, not your turn!");
    return state;
  }
};

// ------------------------------------
// Initial State
// ------------------------------------
//TODO: maybe add draftId here? or are we just getting it from url/location state?
const initialState = { currentPack: {}, pickedCards: [], roundNum: 1 };

// ------------------------------------
// Reducer
// ------------------------------------
export default function boosterDraftReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
