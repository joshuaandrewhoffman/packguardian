import React from "react";
import DraftList from "./DraftList";

//TODO: decide whether to deprecate this class and promote DraftList
//We used to have multiple "menu-like" things in here, and currently we don't
//Figure out whether we'll need more in the near future, and whether we'll want them bundled here or not

export const GridDraftMenu = props => {
  return (
    <div>
      <div>
        {props.gridDraft.gridDraftList &&
          <DraftList draftUrlFragment={"/gridDraft/"} draftList={props.gridDraft.gridDraftList} />}
      </div>
    </div>
  );
};

GridDraftMenu.propTypes = {};

export default GridDraftMenu;
