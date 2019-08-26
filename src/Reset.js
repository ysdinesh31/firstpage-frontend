import React from "react";
import "./App.css";
import { Button } from "react-materialize";
import { services } from "./services/services";
import { withRouter } from "react-router-dom";

class Reset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.match.params.token,
      password: "",
      Confirm_Password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //console.log(event.target.value.name);
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <form
        className="App"
        style={{ height: "250px" }}
        onSubmit={this.handleSubmit}
      >
        <label>
          Password:
          <input type="Password" name="password" onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="Password"
            name="Confirm_Password"
            onChange={this.handleChange}
          />
        </label>
        <br />
        <Button
          type="submit"
          value="Submit"
          style={{ marginTop: "3%", float: "left" }}
        >
          Submit
        </Button>
      </form>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.password !== this.state.Confirm_Password) {
      alert("Passwords don't match");
    }
    services
      .resetPassword(this.state)
      .then(Response => {
        this.props.history.push("/login");
      })
      .catch(error => alert(error.response.data));
  }
}

export default withRouter(Reset);
