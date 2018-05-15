import React from "react";
import "./GridDraft.scss";
import GridDraftGameplay from "../containers/GridDraftGameplayContainer";
import GridDraftMenu from "../containers/GridDraftMenuContainer";
//import { Grid, Row, Cell } from 'react-inline-grid'
import Hammer from "react-hammerjs";

//cube.length seems to be buggy when spamming the reducer. dunno why
export const GridDraft = props => {
  var showGameplay = props.params && props.params.draftId;
  var showMenus = (props.params && !props.params.draftId) || !(props.gridDraft.currentPack.length > 0);
  //These options are important for maintaining click events (instead of hammerjs taps) on child components!
  var hammerOptions = {
    preventDefault: false,
    domEvents: true,
    recognizers: {
      tap: { enable: false }
    }
  };

  var OneSignal = window.OneSignal || [];

  //TODO: see below, but also note this crashes if you hit griddraft/ before hitting / (index) first. Make sure it loads
  //everything always, or else bad things!

  //TODO all of this onesignal crap needs to go on a top level layout page
  OneSignal.on("subscriptionChange", function(isSubscribed, otherstuff) {
    OneSignal.push(["sendTags", { userId: props.authData.userId }]);
  });
  OneSignal.push(function() {
    OneSignal.showHttpPrompt();
  });
  //Also very important that the <Hammer> component is the toplevel returned component for <GridDraft>
  //if we don't do this, our swipe surface is much smaller!
  return (
    <Hammer options={hammerOptions} className="hammer_target" onSwipe={props.swipeGesture}>
      <div>
        {/*Grid Draft Menus*/}
        {showMenus ? <GridDraftMenu /> : null}

        {/*Grid Draft Gameplay*/}
        {showGameplay ? <GridDraftGameplay draftId={props.params.draftId} /> : null}
      </div>
    </Hammer>
  );
};

GridDraft.propTypes = {
  gridDraft: React.PropTypes.object.isRequired,
  swipeGesture: React.PropTypes.func.isRequired
};

export default GridDraft;
