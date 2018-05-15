import { injectReducer } from "../../store/reducers";
import { UserAuthWrapper } from "redux-auth-wrapper";
import { routerActions } from "react-router-redux";
export const GET_RESUMES_LIST = "server/GET_RESUMES_LIST";

// Redirects to /login by default
const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.socket.user, // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: "UserIsAuthenticated" // a nice name for this auth check
});

export default store => ({
  path: "gridDraft(/:draftId)",
  
  getComponent(nextState, cb) {
    
        
    require.ensure(
      [],
      require => {
        
          
        const GridDraft = require("./containers/GridDraftContainer").default;
        const reducer = require("./modules/gridDraft").default;

        /*  Add the reducer to the store on key 'gridDraft'  */
        injectReducer(store, { key: "gridDraft", reducer });
        var state = store.getState();
        //filthy hack, figure out how to do this a cleaner way...
        if (state.location && state.location.pathname && state.location.pathname.split("/gridDraft/").length > 1) {
        } else {
          store.dispatch({
            type: GET_RESUMES_LIST,
            data: {}
          });
        }

        /*  Return getComponent   */
        //  cb(null, GridDraft)
        //TODO swap this back in to get the auth lockout behavior
        cb(null, UserIsAuthenticated(GridDraft));
        
      },
      "gridDraft"
    );
  } //,  onEnter={requireAccess(accessLevels.user)} <-- either this or wrap the component in it, not sure which
});
