import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { browserHistory } from "react-router";
import makeRootReducer from "./reducers";
import { updateLocation } from "./location";
import io from "socket.io-client";
import createSocketIoMiddleware from "redux-socket.io";

let socket = io("http://localhost:3000");
socket.on("connect", function() {
  //SPOILERS!
  /*  socket.emit('authentication', {username: "John", password: "secret"});
  socket.on('authenticated', function() {
    console.log('ΩΩΩΩΩ we authenticated! (client) ΩΩΩΩΩ');
    // use the socket as usual
  });*/
  socket.on("authenticated", function() {
    console.log("ΩΩΩΩΩ we authenticated! (client-inner) ΩΩΩΩΩ");
    // use the socket as usual
  });
  console.log("ΩΩΩΩΩ we made it! socketio connected (client) ΩΩΩΩΩ");
});

socket.on("authenticated", function() {
  console.log("ΩΩΩΩΩ we authenticated! (client) ΩΩΩΩΩ");
  // use the socket as usual
});

socket.on("disconnect", function() {
  console.log("client socketio disconnect!");
});

//PUT GLOBAL SERVER ACTIONS HERE, DON'T USE REDUX-SOCKET.IO
socket.on("action", function(action) {
  if (action.type === "authSuccess") {
    console.log("authSuccess happened " + JSON.stringify(action));
  }
});

let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [socketIoMiddleware, thunk];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];
  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === "function") {
      enhancers.push(devToolsExtension());
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    //  {...initialState, socket:socket},
    compose(applyMiddleware(...middleware), ...enhancers)
  );
  store.asyncReducers = {};

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const reducers = require("./reducers").default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};
