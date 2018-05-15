import { browserHistory } from "react-router";
import * as rootActions from "../../../actions/rootActions";
import * as gridDraftActions from "../actions/gridDraftActions";

// ------------------------------------
// Actions
// ------------------------------------
export function pickRow(value = 1) {
  return {
    type: gridDraftActions.PICK_ROW,
    data: value
  };
}

export function pickColumn(value = 1) {
  return {
    type: gridDraftActions.PICK_COL,
    data: value
  };
}

export const actions = {
  pickRow,
  pickColumn
};

const ACTION_HANDLERS = {};
const initialState = {};

export default function gridDraftGameplayReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
