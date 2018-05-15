import React from "react";
import { IndexLink, Link } from "react-router";
import "./Header.scss";
import { connect } from "react-redux";
import { resetGridState } from "./headerModule";

export const Header = props => (
  <div>
    <h1 className={"hidden-md-down"}>Pack Guardian</h1>
    <div className={"hidden-md-down"}>
      {props.socket.user && <span>logged in as {props.socket.user.userEmail} - {props.socket.user.userId} </span>}
    </div>
    {!props.socket.user &&
      <div className="loggedOutMenus">
        <IndexLink to="/login" activeClassName="route--active">
          Login
        </IndexLink>
        {" · "}
        <Link to="/signup" activeClassName="route--active">
          Sign Up
        </Link>
      </div>}
    {props.socket.user &&
      <div className="loggedInMenus">
        <Link to="/createDraft" activeClassName="route--active">
          New Draft
        </Link>
        {" · "}

        <Link
          to="/gridDraft"
          activeClassName="route--active"
          onClick={() => {
            props.resetGridState();
          }}
        >
          Grid Drafts
        </Link>
        {" · "}

        <Link
          to="/boosterDraft"
          activeClassName="route--active"
          onClick={() => {
            //TODO: probably reset boosterDraft component state here
          }}
        >
          Booster Drafts
        </Link>
      </div>}
  </div>
);

const mapStateToProps = state => ({
  socket: state.socket
});

const mapDispatchToProps = {
  resetGridState
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
