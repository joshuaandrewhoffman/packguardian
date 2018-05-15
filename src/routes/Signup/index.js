import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "signup",

  getComponent(nextState, cb) {


    require.ensure(
      [],
      require => {


        const Signup = require("./containers/SignupContainer").default;
        const reducer = require("./modules/signup").default;

        /*  Add the reducer to the store on key 'counter'  */
        injectReducer(store, { key: "signup", reducer });

        /*  Return getComponent   */
        cb(null, Signup);

      },
      "signup"
    );
  }
});
