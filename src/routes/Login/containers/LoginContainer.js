import { connect } from "react-redux";
//TODO: it looks like there's some cruft here, circle back to double check!
import {
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
  handleSignup,
  handleNewUsernameChange,
  handleNewPassword1Change,
  handleNewPassword2Change
} from "../modules/login";

import Login from "../components/Login";

const mapDispatchToProps = {
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
  handleSignup,
  handleNewUsernameChange,
  handleNewPassword1Change,
  handleNewPassword2Change
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
