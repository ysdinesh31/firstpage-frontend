import React from "react";
import "./App.css";
import { Button } from "react-materialize";
import { services } from "./services/services";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //console.log(event.target.value.name);
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.password.length < 8) {
      alert("password should be greater than 8 characters");
      return;
    }
    services
      .register(this.state)
      .then(res => console.log(res))
      .catch(e => console.log(e));
  }

  render() {
    return (
      <form
        className="App"
        style={{ height: "40%", marginBottom: "30%" }}
        onSubmit={this.handleSubmit}
      >
        <label style={{ width: "90%" }}>
          Name:
          <input
            type="text"
            name="name"
            required
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label style={{ width: "90%" }}>
          Email:
          <input
            type="email"
            name="email"
            validate
            required
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label style={{ width: "90%" }}>
          Password:
          <input
            type="password"
            name="password"
            required
            minlength="8"
            onChange={this.handleChange}
          />
        </label>
        <Button type="submit" value="Submit">
          {" "}
          Submit
        </Button>
      </form>
    );
  }
}

export default Register;
