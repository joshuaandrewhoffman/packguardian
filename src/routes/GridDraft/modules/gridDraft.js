import _ from "lodash";
import * as rootActions from "../../../actions/rootActions";
import * as gridDraftActions from "../actions/gridDraftActions";

// ------------------------------------
// Actions
// ------------------------------------
export function swipeGesture(value = 0) {
  return {
    type: gridDraftActions.SWIPE_GESTURE,
    data: value
  };
}

export const actions = {
  swipeGesture
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [gridDraftActions.GRID_LIST_INIT]: (state, action) => {
    let toRet = { ...state, gridDraftList: action.data };
    return toRet;
  },
  [rootActions.STATE_UPDATE]: (state, action) => {
    return { ...state, ...action.data, startingDraft: false, draftId: action.data.name };
  },
  [rootActions.DRAFT_CLOSED]: (state, action) => {
    //TODO: more friendly notification for this
    alert("sorry, this draft is full.");
    return state;
  },
  [gridDraftActions.RESET_GRID_STATE]: (state, action) => {
    const initialState = { currentPack: [], cube: [], pickedCardsP1: [], pickedCardsP2: [], pick: 1, packNum: 1 };
    return initialState;
  },
  [rootActions.NOT_YOUR_TURN]: (state, action) => {
    //TODO: more friendly notification for this
    alert("sorry, not your turn!");
    return state;
  },
  [gridDraftActions.SWIPE_GESTURE]: (state, action) => {
    //Determine direction of the swipe (abstract this out if we ever use swipes outside of grid)
    var isLeft = action.data.direction === Hammer.DIRECTION_LEFT;
    var isRight = action.data.direction === Hammer.DIRECTION_RIGHT;

    //Close P1 or P2 picks if they're open already
    var isCloseAction = (isLeft && state.showP1PicksOnMobile) || (isRight && state.showP2PicksOnMobile);
    if (isCloseAction) {
      return { ...state, showP1PicksOnMobile: false, showP2PicksOnMobile: false };
    }

    //Open P1 picks
    if (isRight && !state.showP2PicksOnMobile) {
      return { ...state, showP1PicksOnMobile: true, showP2PicksOnMobile: false };
    }

    //Open P2 picks
    if (isLeft && !state.showP1PicksOnMobile) {
      return { ...state, showP1PicksOnMobile: false, showP2PicksOnMobile: true };
    }

    return { state };
  }
};

// ------------------------------------
// Initial State
// --------------]----------------------
const initialState = {
  currentPack: [],
  cube: [],
  cubeList: [],
  pickedCardsP1: [],
  pickedCardsP2: [],
  pick: 1,
  packNum: 1
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function gridDraftReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
