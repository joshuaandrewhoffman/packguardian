//TODO: refactor this to be server/gridDraft (see boosterDraftActions.js)

//TODO: consider flagging things as "server/THING" "client/THING_REPONSE"
//and "intraclient/OTHER_THING" (for client -> client emits)
//it should be obvious at a glance what these do.

//Menu Actions
export const GET_RESUMES_LIST = "server/GET_RESUMES_LIST";
export const RESET_GRID_STATE = "RESET_GRID_STATE";
export const GRID_LIST_INIT = "gridListInit";

//Gameplay Actions
export const PICK_ROW = "server/PICK_ROW";
export const PICK_COL = "server/PICK_COL";
export const SWIPE_GESTURE = "SWIPE_GESTURE";
