import React from "react";
import Header from "../../components/Header";
import "./CoreLayout.scss";
import "../../styles/core.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../../../node_modules/font-awesome/scss/font-awesome.scss";
import { connect } from "react-redux";

export const CoreLayout = ({ children, socket }) => {
  return (
    <div className="container text-center top_level_container">
      <Header />

      <div className="core-layout__viewport">
        {children}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  socket: state.socket
});

const mapDispatchToProps = {};

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
