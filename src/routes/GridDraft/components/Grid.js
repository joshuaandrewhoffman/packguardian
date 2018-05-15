import React from "react";
import "./Grid.scss";

export const Grid = props => (
  <div>
    {/*TODO componentize better than this!*/}
    {props.pack.map(function(row) {
      return (
        <div className={"grid_row"} key={row.key}>
          {row.cards &&
            row.cards.map(function(card) {
              return (
                <span className={"grid_item"} key={row.key + "card" + card.number}>
                  <img className={card.picked ? "hidden" : ""} alt={card.name} src={card.imageUrl} />
                </span>
              );
            })}
          {/*vvv componentize me vvv*/}
          <div className="btn btn-primary" onClick={() => props.pickRow(row.index)}>
            <span className="hidden-md-down">Pick Row</span>
            <span className="hidden-lg-up">
              <i className="fa fa-hand-o-left fa-lg" />
            </span>
          </div>
          {/*^^^ componentize me ^^^*/}
        </div>
      );
    })}

    {props.draftId &&
      <div className={"grid_row"}>
        {/*vvv componentize this or for loop it or something vvv*/}
        <span className={"bottom_grid_item"}>
          <div className="btn btn-primary" onClick={() => props.pickColumn(0)}>
            <span className="hidden-md-down">Pick Col</span>
            <span className="hidden-lg-up">
              <i className="fa fa-hand-o-up fa-lg" />
            </span>
          </div>
        </span>
        <span className={"bottom_grid_item"}>
          <div className="btn btn-primary" onClick={() => props.pickColumn(1)}>
            <span className="hidden-md-down">Pick Col</span>
            <span className="hidden-lg-up">
              <i className="fa fa-hand-o-up fa-lg" />
            </span>
          </div>
        </span>
        <span className={"bottom_grid_item"}>
          <div className="btn btn-primary" onClick={() => props.pickColumn(2)}>
            <span className="hidden-md-down">Pick Col</span>
            <span className="hidden-lg-up">
              <i className="fa fa-hand-o-up fa-lg" />
            </span>
          </div>
        </span>
        <div className="btn btn-primary spacer_button">
          <span className="hidden-md-down">SPACER</span>
          <span className="hidden-lg-up">
            <i className="fa fa-hand-o-left fa-lg" />
          </span>
        </div>
        {/*^^^ componentize this or for loop it or something ^^^*/}
      </div>}
  </div>
);

Grid.propTypes = {
  pack: React.PropTypes.array.isRequired,
  draftId: React.PropTypes.string.isRequired,
  pickRow: React.PropTypes.func.isRequired,
  pickColumn: React.PropTypes.func.isRequired
};

export default Grid;
