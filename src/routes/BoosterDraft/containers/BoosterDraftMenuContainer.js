import { connect } from "react-redux";
import { getResumesList, resumeDraft, openDraftStart, createDraft } from "../modules/boosterDraftMenu";
import BoosterDraftMenu from "../components/BoosterDraftMenu";

const mapDispatchToProps = {
  resumeDraft,
  getResumesList,
  openDraftStart,
  createDraft
};

const mapStateToProps = (state, ownProps) => {
  return {
    boosterDraft: state.boosterDraft,
    boosterDraftMenuReducer: state.boosterDraftMenuReducer
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoosterDraftMenu);
