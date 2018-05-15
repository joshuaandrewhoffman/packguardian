import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "login",
  
  getComponent(nextState, cb) {
    
        
    require.ensure(
      [],
      require => {
        
          
        const Login = require("./containers/LoginContainer").default;
        const reducer = require("./modules/login").default;

        /*  Add the reducer to the store on key 'counter'  */
        injectReducer(store, { key: "login", reducer });

        /*  Return getComponent   */
        cb(null, Login);
        
      },
      "login"
    );
  }
});
//old ver
//import Login from './Login'
//export default Login
//do we need injectReducer stuff here?
