import React from "react";
//import classes from './GridDraft.scss'

export const Signup = props => (
  <div>
    <h3>Sign up</h3>
    <form action="/signup" method="post">
      <div className="form-group">
        <label>Email</label>
        <input type="text" className="form-control" name="email" />
      </div>
      <div className="form-group">
        <label>Nickname (public)</label>
        <input type="text" className="form-control" name="nickname" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" name="password" />
      </div>
      <button type="submit" className="btn btn-primary btn-lg">Signup</button>
    </form>

  </div>
);

Signup.propTypes = {
  handleSignup: React.PropTypes.func.isRequired
};

export default Signup;
