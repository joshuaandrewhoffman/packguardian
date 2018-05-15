import { connect } from "react-redux";
import { getResumesList, resumeDraft, openDraftStart, createDraft } from "../modules/gridDraftMenu";
import GridDraftMenu from "../components/GridDraftMenu";

const mapDispatchToProps = {
  resumeDraft,
  getResumesList,
  openDraftStart,
  createDraft
};

const mapStateToProps = (state, ownProps) => {
  return {
    gridDraft: state.gridDraft,
    gridDraftMenuReducer: state.gridDraftMenuReducer
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GridDraftMenu);
