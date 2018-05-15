import * as rootActions from "../actions/rootActions";

// ------------------------------------
// Actions
// ------------------------------------
export function locationChange(location = "/") {
  return {
    type: rootActions.LOCATION_CHANGE,
    payload: location
  };
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const updateLocation = ({ dispatch }) => {
  return nextLocation => dispatch(locationChange(nextLocation));
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null;
export default function locationReducer(state = initialState, action) {
  //UPDATE LOCATION AS NEEDED BASED ON ANY EMITTED ACTION HERE!
  if (action.type === rootActions.STATE_UPDATE) {
    //TODO: things
    //  window.location('gotThere');
    //return {...state, pathname: state.pathname + '/gotThere'}
  }

  return action.type === rootActions.LOCATION_CHANGE ? action.payload : state;
}
