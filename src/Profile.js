import React from "react";
import "./App.css";
import { services } from "./services/services";
import { connect } from "react-redux";
import { Textarea } from "react-materialize";
import * as actionCreators from "./actions/actions";

class Profile extends React.Component {
  componentDidMount() {
    services
      .profile()
      .then(Response => {
        //debugger;
        this.props.userProfile(Response.data);
      })
      .catch(error => {
        console.log(error.response.status);
        if (error.response.status === 401) {
          //debugger;
          this.props.history.push("/logout");
        }
      });

    console.log(this.props.Name);
  }
  render() {
    //debugger;
    //this.props.getProfile();
    console.log(this.props);
    return (
      <div>
        <div className="App">
          <Textarea label="Name" value={this.props.Name} disabled />
          <Textarea label="email" value={this.props.Email} disabled />
          <Textarea label="role" value={this.props.Role} disabled />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //debugger;
  return {
    Name: state.AuthReducer.Name,
    Email: state.AuthReducer.Email,
    Role: state.AuthReducer.Role
  };
};

const mapDispatchToProps = dispatch => {
  //debugger;
  return {
    userProfile: data => dispatch(actionCreators.userProfile(data)),
    logout: () => dispatch(actionCreators.logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
