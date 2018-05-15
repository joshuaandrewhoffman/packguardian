//IMPORTANT!
//When you new up components via this template you need to perform case-sensitive replacements on:
// ChangeMe
// changeMe
//and you need to modify
// TODO_CHOOSE_COMPONENT_PATH
//IMPORTANT!
/*import { injectReducer } from "../../store/reducers";
import { UserAuthWrapper } from "redux-auth-wrapper";
import { routerActions } from "react-router-redux";

// Redirects to /login by default
const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.socket.user, // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: "UserIsAuthenticated" // a nice name for this auth check
});

export default store => ({
  path: "TODO_CHOOSE_COMPONENT_PATH",
  //  Async getComponent is only invoked when route matches
  getComponent(nextState, cb) {
    //  Webpack - use 'require.ensure' to create a split point and embed an async module loader (jsonp) when bundling
    require.ensure(
      [],
      require => {
        //Webpack - use require callback to define dependencies for bundling
        const ChangeMe = require("./containers/ChangeMeContainer").default;
        const reducer = require("./modules/changeMe").default;

        //Add the reducer to the store on key 'changeMe'
        injectReducer(store, { key: "changeMe", reducer });
        var state = store.getState();

        //  Return getComponent

        cb(null, UserIsAuthenticated(ChangeMe));
        // Webpack named bundle
      },
      "changeMe"
    );
  }
});
*/
