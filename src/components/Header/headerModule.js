import * as rootActions from "../../actions/rootActions";
import * as gridDraftActions from "../../routes/GridDraft/actions/gridDraftActions";

export function resetGridState(value = 1) {
  /*TODO: once booster draft is real, this reset will need to change
  we don't want to have to run a list of resetThing1() resetThing2() commands
  instead, this should be a clean wipe to an initial menu state
  maybe each draft (and other page?) needs to provide a [RESET] handler
  and we can just emit that reset here, and leave the components responsible
  for resetting themselves? */

  return {
    type: gridDraftActions.RESET_GRID_STATE,
    data: value
  };
}

export const actions = {
  resetGridState
};
