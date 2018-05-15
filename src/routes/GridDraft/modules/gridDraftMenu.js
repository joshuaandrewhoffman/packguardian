import * as rootActions from "../../../actions/rootActions";
import * as gridDraftActions from "../actions/gridDraftActions";

export const CREATE_DRAFT = "server/CREATE_DRAFT";

export const actions = {};

const ACTION_HANDLERS = {
  [rootActions.OPEN_DRAFT_START_FORM]: (state, action) => {
    const startingDraft = true;
    return { ...state, startingDraft };
  },
  [gridDraftActions.RESET_GRID_STATE]: (state, action) => {
    const initialState = {};
    return initialState;
  }
};
const initialState = {};

export default function gridDraftMenuReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
