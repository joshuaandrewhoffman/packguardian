import React from "react";
import "./Picks.scss";

export const Picks = props => {
  //if we can pass an isMobile here, we can do a conditional ? picks-mobile-full : picks
  //this will let us get height: 100% for mobile ux
  return (
    <div className={"picks"}>
      {props.pickedCards.map(function(card) {
        return (
          <div key={"pick " + card.name + " number " + card.number}><img alt={card.name} src={card.imageUrl} /></div>
        );
      })}
    </div>
  );
};
Picks.propTypes = {
  pickedCards: React.PropTypes.array.isRequired
};

export default Picks;
