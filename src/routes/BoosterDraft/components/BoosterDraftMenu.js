import React from "react";
import DraftList from "../../GridDraft/components/DraftList";
//TODO: move common draft components out of /GridDraft/

export const BoosterDraftMenu = props => {
  return (
    <div>

      <div>
        {props.boosterDraft.boosterDraftList &&
          <DraftList
            draftUrlFragment={"/boosterDraft/"}
            draftList={props.boosterDraft.boosterDraftList}
            resumeDraft={props.resumeDraft}
          />}
      </div>
    </div>
  );
};

BoosterDraftMenu.propTypes = {};

export default BoosterDraftMenu;
