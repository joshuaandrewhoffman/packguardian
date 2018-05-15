import _ from "lodash";
import { log } from "../../log";
import { prepareGridDraft } from "../gridDraft/prepareGridDraft";
import { prepareBoosterDraft } from "../boosterDraft/prepareBoosterDraft";
import * as sharedConstants from "../../../src/constants/sharedConstants";

export const startDraftActionHandler = (DraftModels, state, action, ownerInfo, afterDraftCreatedCallback) => {
  log(
    "startDraftCalled, draft is: " +
      action.data.draftName +
      ", draftType is: " +
      action.data.draftType +
      ", and cubeName is: " +
      action.data.cubeName
  );

  const { Cube, Draft, BoosterDraft } = DraftModels;

  if (!action.data.cubeName) {
    log("ERROR! bad cubename in START_DRAFT");
    //TODO: need more real error handling than this - can't rely on there being a riptide cube available.
    action.data.cubeName = "riptidelab";
  }
  var startWithCube = [];

  return Cube.findOne(
      {
        name: action.data.cubeName
      },
      function(err, result) {
        if (err) return handleError(err);

        var resultCube = result.cube;
        var currCube = _.map(resultCube, function(card) {
          var toRet = {
            number: card.number,
            name: card.name,
            imageUrl: card.imageUrl,
            picked: card.picked
          };
          return toRet;
        });

        if (action.data.draftType === sharedConstants.GRID_TYPE) {
          //JAH TODO: refactor because it's gross that we have to pass in state just to mutate it
          //especially since we pass out a draft object that's only slightly different from the state[uuid] draft object
          var draft = prepareGridDraft(
            Draft,
            state,
            currCube,
            result.name,
            action.data.draftName,
            ownerInfo.id,
            action.data.draftType
          );
        } else if (action.data.draftType === sharedConstants.BOOSTER_TYPE) {
          var draft = prepareBoosterDraft(
            BoosterDraft,
            state,
            currCube,
            result.name,
            action.data.draftName,
            ownerInfo,
            action.data.draftType,
            action.data.playerCount
          );
        } else {
          return;
        }
        return draft.save(function(err, draft) {
          if (err) return console.error(err);
          log("calling afterDraftCreatedCallback");
          afterDraftCreatedCallback(draft);
        });
      }
    )
    .lean();
};
