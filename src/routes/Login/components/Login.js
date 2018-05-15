import React from "react";
//import classes from './GridDraft.scss'

export const Login = props => (
  <div>
    <h3>Login</h3>
    <form action="/login" method="post">
      <div className="form-group">
        <label>Email</label>
        <input type="text" className="form-control" name="email" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" name="password" />
      </div>

      <button type="submit" className="btn btn-primary btn-lg">Login</button>
    </form>
  </div>
);

Login.propTypes = {
  handleUsernameChange: React.PropTypes.func.isRequired,
  handlePasswordChange: React.PropTypes.func.isRequired,
  handleLogin: React.PropTypes.func.isRequired,
  handleSignup: React.PropTypes.func.isRequired,
  handleNewUsernameChange: React.PropTypes.func.isRequired,
  handleNewPassword1Change: React.PropTypes.func.isRequired,
  handleNewPassword2Change: React.PropTypes.func.isRequired
};

export default Login;
