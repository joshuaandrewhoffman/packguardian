import React from "react";
import Booster from "./Booster";
import BoosterDraftWaiting from "../containers/BoosterDraftWaitingContainer";

export const BoosterDraftGameplay = props => {
  const waitingForPlayers = props.boosterDraft &&
    props.boosterDraft.playerInfoArr &&
    props.boosterDraft.playerCount &&
    props.boosterDraft.playerInfoArr.length < props.boosterDraft.playerCount;

  return (
    <div>

      {/*Booster Draft Waiting For Players*/}
      {waitingForPlayers ? <BoosterDraftWaiting /> : null}

      {!waitingForPlayers &&
        <div>
          <h2 className={"hidden-md-down"}>{props.draftId}</h2>
          <div>Packs Waiting {props.boosterDraft.packsWaiting}</div>
          {props.boosterDraft.currentPack &&
            <Booster pack={props.boosterDraft.currentPack} pickCard={props.pickCard} draftId={props.draftId} />}
        </div>}

    </div>
  );
  //TODO probably hide a swipeable (or something?) <BoosterPicks> component here
};

BoosterDraftGameplay.propTypes = {};

export default BoosterDraftGameplay;
