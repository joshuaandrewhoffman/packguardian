import { connect } from "react-redux";
import { startDraft, handleChange } from "../modules/draftStartForm";
import { BOOSTER_TYPE, GRID_TYPE } from "../../../constants/sharedConstants";

import DraftStartForm from "../components/DraftStartForm";

//TODO: async validate available draft name
//TODO: validate draft name no spaces etc

const mapDispatchToProps = {
  startDraft,
  handleChange
};

const mapStateToProps = (state, ownProps) => {
  return {
    draftStartForm: state.draftStartForm,
    BOOSTER_TYPE: BOOSTER_TYPE,
    GRID_TYPE: GRID_TYPE,
    draftType: state.forms.test.draftType.value
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DraftStartForm);
