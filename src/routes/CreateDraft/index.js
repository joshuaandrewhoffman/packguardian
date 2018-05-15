import { injectReducer } from "../../store/reducers";
import { UserAuthWrapper } from "redux-auth-wrapper";
import { routerActions } from "react-router-redux";
import * as rootActions from "../../actions/rootActions";

// Redirects to /login by default
const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.socket.user, // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: "UserIsAuthenticated" // a nice name for this auth check
});

export default store => ({
  path: "createDraft",
  
  getComponent(nextState, cb) {
    
        
    require.ensure(
      [],
      require => {
        
          
        const DraftStartForm = require("./containers/DraftStartFormContainer").default;
        const reducer = require("./modules/draftStartForm").default;

        /*  Add the reducer to the store on key 'draftStartForm'  */
        injectReducer(store, { key: "draftStartForm", reducer });

        store.dispatch({
          type: rootActions.OPEN_DRAFT_START_FORM,
          data: {}
        });

        /*  Return getComponent   */
        cb(null, UserIsAuthenticated(DraftStartForm));
        
      },
      "draftStartForm"
    );
  }
});
