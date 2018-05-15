import { browserHistory } from "react-router";
import * as boosterDraftActions from "../actions/boosterDraftActions";

// ------------------------------------
// Actions
// ------------------------------------
//TODO debounce these buttons with lodash!
export function pickCard(value = -1) {
  //TODO: double check if this is necessary or if we can just let it be null/undef
  if (value !== -1) {
    return {
      type: boosterDraftActions.PICK_CARD,
      data: value
    };
  }
}
//TODO debounce these buttons with lodash!

/*TODO: need to style this component (see the component for this module)
slightly smaller,
widen the display to 5 cards per line,
or remove some header cruft.
Cards spill off the page currently*/

export const actions = {
  pickCard
};

const ACTION_HANDLERS = {};
const initialState = {};

export default function boosterDraftGameplayReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
