import { connect } from "react-redux";
import BoosterDraft from "../components/BoosterDraft";

const mapDispatchToProps = {};

const mapStateToProps = (state, ownProps) => {
  return {
    boosterDraft: state.boosterDraft
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoosterDraft);
