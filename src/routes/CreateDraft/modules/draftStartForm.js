import { browserHistory } from "react-router";
import * as rootActions from "../../../actions/rootActions";
import * as sharedConstants from "../../../constants/sharedConstants";
export const NOOP = "NOOP";

// ------------------------------------
// Actions
// ------------------------------------
export function startDraft(value = "asdf") {
  //TODO: MUST clear state when the submit occurs

  //TODO: if we want this component to see re-use this is gonna have to become generic
  if (value.draftType === sharedConstants.GRID_TYPE) {
    browserHistory.push("/gridDraft/" + value.draftName);
  } else if (value.draftType === sharedConstants.BOOSTER_TYPE) {
    browserHistory.push("/boosterDraft/" + value.draftName);
  }
  return {
    type: rootActions.START_DRAFT,
    data: value
  };
}

export function handleChange(value = "asdf") {
  return {
    type: NOOP,
    data: value
  };
}

export const actions = {
  startDraft,
  handleChange
};

const ACTION_HANDLERS = {
  [rootActions.CUBE_LIST_INIT]: (state, action) => {
    let toRet = { ...state, cubeList: action.data };
    return toRet;
  }
};
const initialState = { cubeList: [], draftTypes: [sharedConstants.GRID_TYPE, sharedConstants.BOOSTER_TYPE] };

export default function draftStartFormReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
