import React from "react";
import "./App.css";
import { Button, Preloader } from "react-materialize";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { services } from "./services/services";
import * as actionCreators from "./actions/actions";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  handleChange(event) {
    //console.log(event.target.value.name);

    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ loading: true }, () => {
      //debugger;
    });
    //var password = event.target.value;

    event.preventDefault();

    services
      .login(this.state)
      .then(Response => {
        //this.props.userProfile(Response.data);
        //this.props.go();
        this.props.login();
        this.props.history.push("/welcome");
        this.setState({ loading: false });
        //window.location.replace("http://localhost:3000/welcome");
      })
      .catch(error => {
        this.setState({ loading: false });
        alert(error.response.data);
      });

    //debugger;
  }

  redirect() {
    // <Router>
    //browserHistory.push("/welcome");
  }

  render() {
    return (
      <form className="App" onSubmit={this.handleSubmit}>
        <label style={{ width: "90%" }}>
          Email:
          <input
            type="email"
            name="email"
            validate
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label style={{ width: "90%" }}>
          Password:
          <input
            type="password"
            name="password"
            validate
            minlength="8"
            onChange={this.handleChange}
          />
        </label>
        <br />

        <Button
          type="submit"
          value="Submit"
          className="link1"
          style={{ float: "left" }}
        >
          {" "}
          Submit
        </Button>
        <Preloader
          className="preloader"
          flashing
          active={this.state.loading}
          size="small"
          style={{ height: "25px", width: "25px", marginTop: "10px" }}
        />
        <Link to="/register">
          <Button className="link1">Sign up at...</Button>
        </Link>
        <Link to="/forgotpassword">
          <Button style={{ float: "unset", marginTop: "3%" }}>
            Forgot Password?
          </Button>
        </Link>
      </form>
    );
  }
}

// function userProfile(data) {
//   return {
//     type: 'USER_PROFILE',
//     data
//   };
// }

const mapDispatchToProps = dispatch => {
  return {
    userProfile: data => dispatch(actionCreators.userProfile(data)),
    login: () => dispatch(actionCreators.login())
  };
};
//Login = withRouter(Login);
export default connect(
  null,
  mapDispatchToProps
)(withRouter(Login));
