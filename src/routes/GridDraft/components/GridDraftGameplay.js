import React from "react";
import PicksSidebar from "../containers/PicksSidebarContainer";

import Grid from "./Grid";

export const getSidebarClasses = (showSidebar, forPlayer) => {
  var classes = [];
  if (forPlayer === 1) {
    classes.push("sidebar_left");
  } else if (forPlayer === 2) {
    classes.push("sidebar_right");
  }
  if (!showSidebar) {
    classes.push("hidden-md-down");
  }
  return classes.join(" ");
};

export const GridDraftGameplay = props => {
  var sidebarLeftClasses = getSidebarClasses(props.gridDraft.showP1PicksOnMobile, 1);
  var sidebarRightClasses = getSidebarClasses(props.gridDraft.showP2PicksOnMobile, 2);
  return (
    <div>
      <h2 className={"hidden-md-down"}>{props.draftId}</h2>
      <h3 className={"counterContainer hidden-md-down"}>
        Pack Number {" "}
        <span className={"counter--green"}>
          {props.gridDraft.packNum}
        </span>
      </h3>
      <div className={sidebarLeftClasses}>
        <PicksSidebar pickedCards={props.gridDraft.pickedCardsP1} playerNumber={1} />
      </div>

      {props.gridDraft.currentPack &&
        <Grid
          pack={props.gridDraft.currentPack}
          pickRow={props.pickRow}
          pickColumn={props.pickColumn}
          draftId={props.draftId}
        />}

      <div className={sidebarRightClasses}>
        <PicksSidebar pickedCards={props.gridDraft.pickedCardsP2} playerNumber={2} />
      </div>
    </div>
  );
};

GridDraftGameplay.propTypes = {};

export default GridDraftGameplay;
