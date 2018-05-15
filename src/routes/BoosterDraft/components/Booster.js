import React from "react";
import "./Booster.scss";

export const Booster = props => {
  return (
    <div>
      {props.pack &&
        props.pack.cards &&
        props.pack.cards.map(function(card) {
          return (
            <span className={"grid_item"} key={"card" + card.number}>
              <img
                className={card.picked ? "hidden" : ""}
                onClick={() => props.pickCard(card)}
                alt={card.name}
                src={card.imageUrl}
              />
            </span>
          );
        })}
    </div>
  );
};

Booster.propTypes = {
  pack: React.PropTypes.object.isRequired,
  draftId: React.PropTypes.string.isRequired,
  pickCard: React.PropTypes.func.isRequired
};

export default Booster;
