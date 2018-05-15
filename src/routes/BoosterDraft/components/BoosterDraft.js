import React from "react";
import "./BoosterDraft.scss";
import BoosterDraftGameplay from "../containers/BoosterDraftGameplayContainer";
import BoosterDraftMenu from "../containers/BoosterDraftMenuContainer";

export const BoosterDraft = props => {
  //if we don't have playerIds === playerCount, we're still waiting for more to join!

  const showGameplay = props.params && props.params.draftId;
  const showMenus = (props.params && !props.params.draftId) || !(props.boosterDraft.currentPack.length > 0);

  return (
    <div>
      {/*Booster Draft Menus*/}
      {showMenus ? <BoosterDraftMenu /> : null}

      {/*Booster Draft Gameplay*/}
      {showGameplay ? <BoosterDraftGameplay draftId={props.params.draftId} /> : null}
    </div>
  );
};

BoosterDraft.propTypes = {
  boosterDraft: React.PropTypes.object.isRequired
};

export default BoosterDraft;
