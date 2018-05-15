import { connect } from "react-redux";
import { pickRow, pickColumn } from "../modules/gridDraftGameplay";
import GridDraftGameplay from "../components/GridDraftGameplay";

const mapDispatchToProps = {
  pickRow,
  pickColumn
};

const mapStateToProps = (state, ownProps) => {
  return {
    gridDraft: state.gridDraft
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GridDraftGameplay);
