import { injectReducer } from "../../store/reducers";
import { UserAuthWrapper } from "redux-auth-wrapper";
import { routerActions } from "react-router-redux";
import { GET_BOOSTER_DRAFT_RESUMES_LIST } from "./actions/boosterDraftActions";

// Redirects to /login by default
const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.socket.user, // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: "UserIsAuthenticated" // a nice name for this auth check
});

export default store => ({
  path: "boosterDraft(/:draftId)",

  getComponent(nextState, cb) {
    require.ensure(
      [],
      require => {


        const BoosterDraft = require("./containers/BoosterDraftContainer").default;
        const reducer = require("./modules/boosterDraft").default;

        /*  Add the reducer to the store on key 'gridDraft'  */
        injectReducer(store, { key: "boosterDraft", reducer });
        var state = store.getState();
        //filthy hack, figure out how to do this a cleaner way...
        if (state.location && state.location.pathname && state.location.pathname.split("/boosterDraft/").length > 1) {
          //TODO: IMPORTANT! figure out why grid doesn't need this anymore. COPY THAT!
          /*var data = { draft: { name: state.location.pathname.split("/boosterDraft/")[1] } };
          store.dispatch({
            type: GET_BOOSTER_DRAFT_RESUMES_LIST,
            data: data
          });*/
        } else {
          store.dispatch({
            type: GET_BOOSTER_DRAFT_RESUMES_LIST,
            data: {}
          });
        }

        cb(null, UserIsAuthenticated(BoosterDraft));
        
      },
      "boosterDraft"
    );
  }
});
