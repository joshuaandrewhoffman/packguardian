import * as rootActions from "../../../actions/rootActions";

// ------------------------------------
// Constants
// ------------------------------------
export const USERNAME_CHANGED = "USERNAME_CHANGED";
export const PASSWORD_CHANGED = "PASSWORD_CHANGED";
export const LOGIN = "LOGIN";
export const HANDLE_NEW_USERNAME_CHANGE = "HANDLE_NEW_USERNAME_CHANGE";
export const HANDLE_NEW_PASSWORD1_CHANGE = "HANDLE_NEW_PASSWORD1_CHANGE";
export const HANDLE_NEW_PASSWORD2_CHANGE = "HANDLE_NEW_PASSWORD2_CHANGE";

// ------------------------------------
// Actions
// ------------------------------------
//we emit this
export function handleUsernameChange(event) {
  var value = event.target.value;
  return {
    type: USERNAME_CHANGED,
    payload: { value: value }
  };
}

export function handlePasswordChange(event) {
  var value = event.target.value;
  return {
    type: PASSWORD_CHANGED,
    payload: { value: value }
  };
}

export function handleLogin(event) {
  var value = event.target.value;
  return {
    type: LOGIN,
    payload: { value: value }
  };
}

export function handleSignup(event) {
  console.log("handleSignup called");
  var value = event.target.value;
  console.log("value is " + value);

  //vvv IMPORTANT if we're doing our own form logic!
  event.preventDefault();
  //^^^ IMPORTANT if we're doing our own form logic!

  return {
    type: rootActions.HANDLE_SIGNUP,
    data: value
  };
}

export function handleNewUsernameChange(event) {
  var value = event.target.value;
  return {
    type: HANDLE_NEW_USERNAME_CHANGE,
    payload: { value: value }
  };
}

export function handleNewPassword1Change(event) {
  var value = event.target.value;
  return {
    type: HANDLE_NEW_PASSWORD1_CHANGE,
    payload: { value: value }
  };
}

export function handleNewPassword2Change(event) {
  var value = event.target.value;
  //TODO: onchange validate against password1
  //onchange, set "startedP2 = true"
  //in p1, if state.startedP2, perform validate
  return {
    type: HANDLE_NEW_PASSWORD2_CHANGE,
    payload: { value: value }
  };
}

export const actions = {
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
  handleSignup,
  handleNewUsernameChange,
  handleNewPassword1Change,
  handleNewPassword2Change
  //  getResumesList
};

// ------------------------------------
// Action Handlers
// ------------------------------------
//and it goes to this reducer
const ACTION_HANDLERS = {
  [USERNAME_CHANGED]: (state, action) => {
    console.log("USERNAME_CHANGED - VALUE:" + action.payload.value);
    console.log("state is " + JSON.stringify(state));
    const ret = { ...state, username: action.payload.value };
    console.log("new state is " + JSON.stringify(ret));
    return ret;
  },
  [PASSWORD_CHANGED]: (state, action) => {
    console.log("PASSWORD_CHANGED - VALUE:" + action.payload.value);
    console.log("state is " + JSON.stringify(state));
    const ret = { ...state, password: action.payload.value };
    console.log("new state is " + JSON.stringify(ret));
    return ret;
  },
  [LOGIN]: (state, action) => {
    console.log("LOGIN click occurred");
    return state;
  },
  [HANDLE_NEW_USERNAME_CHANGE]: (state, action) => {
    console.log("HANDLE_NEW_USERNAME_CHANGE - VALUE:" + action.payload.value);
    const ret = { ...state, newUsername: action.payload.value };
    return ret;
  },
  [HANDLE_NEW_PASSWORD1_CHANGE]: (state, action) => {
    console.log("HANDLE_NEW_PASSWORD1_CHANGE - VALUE:" + action.payload.value);
    const ret = { ...state, password1: action.payload.value };
    return ret;
  },
  [HANDLE_NEW_PASSWORD2_CHANGE]: (state, action) => {
    console.log("HANDLE_NEW_PASSWORD2_CHANGE - VALUE:" + action.payload.value);
    const ret = { ...state, password2: action.payload.value };
    return ret;
  },
  [rootActions.HANDLE_SIGNUP_CALLBACK]: (state, action) => {
    console.log("handleSignupCallback received!");
    console.log("action.data = " + action.data);
    let toRet = { ...state, handleSignupCallbackData: action.data };
    return toRet;
  }
};

// ------------------------------------
// Initial State
// ------------------------------------
//rows are of the form:
/*
state.currentPack[0]
Object {index: "0", key: "pick0row0", cards: Array[5]}
*/

//cube is of the form:
/*
{
   "number":1,
   "name":"Champion of the Parish",
   "imageUrl":"https://deckbox.org/mtg/Champion of the Parish/tooltip",
   "picked":false
},
*/
const initialState = {};

// ------------------------------------
// Reducer
// ------------------------------------
export default function loginReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
