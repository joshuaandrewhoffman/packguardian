import * as rootActions from "../../../actions/rootActions";

// ------------------------------------
// Actions
// ------------------------------------

export const actions = {

};

const ACTION_HANDLERS = {
};
const initialState = {};

export default function picksSidebar(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
