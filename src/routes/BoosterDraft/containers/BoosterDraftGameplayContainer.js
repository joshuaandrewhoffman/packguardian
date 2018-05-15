import { connect } from "react-redux";
import { pickCard } from "../modules/boosterDraftGameplay";
import BoosterDraftGameplay from "../components/BoosterDraftGameplay";

const mapDispatchToProps = {
  pickCard
};

const mapStateToProps = (state, ownProps) => {
  return {
    boosterDraft: state.boosterDraft
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoosterDraftGameplay);
