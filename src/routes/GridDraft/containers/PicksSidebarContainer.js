import { connect } from "react-redux";
import PicksSidebar from "../components/PicksSidebar";

const mapDispatchToProps = {
};

const mapStateToProps = (state, ownProps) => {
  return {
    gridDraft: state.gridDraft,
    picksSidebar: state.picksSidebar
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PicksSidebar);
