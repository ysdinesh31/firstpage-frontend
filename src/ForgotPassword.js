import React from "react";
import "./App.css";
import { Button } from "react-materialize";

import { services } from "./services/services";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
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
        style={{ height: "200px" }}
        onSubmit={this.handleSubmit}
      >
        <label style={{ width: "90%" }}>
          Email:
          <input type="email" name="email" onChange={this.handleChange} />
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
    services
      .forgotPassword(this.state)
      .then(Response => {
        alert("Mail Sent. Please Check your mail");
        //this.props.userProfile(Response.data);
        //this.props.history.push("/login");
      })
      .catch(error => alert(error.response.data));
  }
}

export default ForgotPassword;
