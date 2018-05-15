import React from "react";
import "./PicksSidebar.scss";
import Picks from "./Picks";

export const PicksSidebar = props => {
  return (
    <div className="sidebar-container-div">
      {/*Labels*/}
      {props.playerNumber === 1 && <span className={"hidden-md-down"}>P1 PICKS</span>}
      {props.playerNumber === 2 && <span className={"hidden-md-down"}>P2 PICKS</span>}

      {/*Card Images*/}
      {props.pickedCards && <Picks pickedCards={props.pickedCards} />}

      {props.playerNumber === 1 && <div className="hidden-lg-up mobile-player-number">P1 PICKS</div>}
      {props.playerNumber === 2 && <div className="hidden-lg-up mobile-player-number">P2 PICKS</div>}
    </div>
  );
};

PicksSidebar.propTypes = {
  pickedCards: React.PropTypes.array.isRequired,
  playerNumber: React.PropTypes.number.isRequired
};

export default PicksSidebar;
