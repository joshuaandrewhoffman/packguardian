import * as rootActions from "../../../actions/rootActions";

// ------------------------------------
// Actions
// ------------------------------------
export function handleSignup(event) {
  var value = event.target.value;

  //vvv IMPORTANT if we're doing our own form logic!
  event.preventDefault();
  //^^^ IMPORTANT if we're doing our own form logic!

  return {
    type: rootActions.HANDLE_SIGNUP,
    data: value
  };
}

export const actions = {
  handleSignup
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [rootActions.HANDLE_SIGNUP_CALLBACK]: (state, action) => {
    let toRet = { ...state, handleSignupCallbackData: action.data };
    return toRet;
  }
};

const initialState = {};

// ------------------------------------
// Reducer
// ------------------------------------
export default function signupReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
