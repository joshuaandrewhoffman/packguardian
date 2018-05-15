// We only need to import the modules necessary for initial render
import CoreLayout from "../layouts/CoreLayout/CoreLayout";
import Home from "./Home";
import LoginRoute from "./Login";
import SignupRoute from "./Signup";
import GridDraftRoute from "./GridDraft";
import BoosterDraftRoute from "./BoosterDraft";
import CreateDraftRoute from "./CreateDraft";

//TODO: active route isn't updating on topnav changes - repro by clicking between Grid & Booster

//Note: setting up these routes (somehow?) sets up the reducers. See reducers.js for the normal way to do it.
export const createRoutes = store => ({
  path: "/",
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    LoginRoute(store),
    SignupRoute(store),
    CreateDraftRoute(store),
    GridDraftRoute(store),
    BoosterDraftRoute(store)
  ]
});

export default createRoutes;
