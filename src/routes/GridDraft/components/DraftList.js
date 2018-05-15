import React from "react";
import "./DraftList.scss";
import { browserHistory } from "react-router";

export const DraftList = props => (
  <div>
    {props.draftList.map(function(draft) {
      return (
        <div
          key={"pick " + draft.name}
          className="link"
          onClick={() => {
            browserHistory.push(props.draftUrlFragment + draft.name);
          }}
        >
          <a>{draft.name}</a>
        </div>
      );
    })}
  </div>
);

DraftList.propTypes = {
  draftList: React.PropTypes.array.isRequired
};

export default DraftList;
