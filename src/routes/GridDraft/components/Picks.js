import React from "react";
import "./Picks.scss";
import {Scrollbars} from 'react-custom-scrollbars';

export const Picks = props => {
  //if we can pass an isMobile here, we can do a conditional ? picks-mobile-full : picks
  //this will let us get height: 100% for mobile ux
  return (
      <Scrollbars style={{width:240}}>
        {props.pickedCards.map(function(card) {
          return (
            <div key={"pick " + card.name + " number " + card.number}><img className={"pick"} alt={card.name} src={card.imageUrl} /></div>
          );
        })}
          </Scrollbars>

  );
};
Picks.propTypes = {
  pickedCards: React.PropTypes.array.isRequired
};

export default Picks;
