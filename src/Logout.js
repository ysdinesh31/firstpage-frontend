import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actionCreators from "./actions/actions";

class Logout extends React.Component {
  render() {
    //debugger;
    var mydate = new Date();
    mydate.setTime(mydate.getTime() - 1);
    document.cookie = "token=; expires=" + mydate.toGMTString() + ";path=/";
    console.log(document.cookie);
    this.props.logout();
    this.props.history.push("/login");
    return null;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actionCreators.logout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Logout));
