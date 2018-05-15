import * as boosterDraftActions from "../actions/boosterDraftActions";

// ------------------------------------
// Actions
// ------------------------------------
export function createDraft(value = "asdf") {
  return {
    type: boosterDraftActions.CREATE_BOOSTER_DRAFT,
    data: value
  };
}

export function openDraftStart() {
  return {
    type: boosterDraftActions.OPEN_BOOSTER_DRAFT_START_FORM,
    data: {}
  };
}

export function resumeDraft(value = "0x1234567890abcdef") {
  return {
    type: boosterDraftActions.RESUME_BOOSTER_DRAFT,
    data: value
  };
}

export function getResumesList() {
  console.log("clicked getresumes");
  return {
    type: boosterDraftActions.GET_BOOSTER_DRAFT_RESUMES_LIST,
    data: {}
  };
}

export const actions = {
  resumeDraft,
  getResumesList,
  openDraftStart,
  createDraft
};

const ACTION_HANDLERS = {
  [boosterDraftActions.OPEN_BOOSTER_DRAFT_START_FORM]: (state, action) => {
    const startingDraft = true;
    return { ...state, startingDraft };
  },
  [boosterDraftActions.RESET_BOOSTER_DRAFT_STATE]: (state, action) => {
    const initialState = {};
    return initialState;
  }
};
const initialState = {};

export default function boosterDraftMenuReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
