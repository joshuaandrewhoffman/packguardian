import { connect } from "react-redux";
import { swipeGesture } from "../modules/gridDraft";
import GridDraft from "../components/GridDraft";

const mapDispatchToProps = {
  swipeGesture
};

const mapStateToProps = (state, ownProps) => {
  return {
    gridDraft: state.gridDraft
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GridDraft);
