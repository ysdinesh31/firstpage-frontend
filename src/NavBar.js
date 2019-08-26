import React from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Navbar, NavItem, Textarea } from "react-materialize";

class NavBar extends React.Component {
  render() {
    return (
      <Navbar alignLinks="right">
        <NavItem>
          <Link to="/userlist">User List</Link>
        </NavItem>
        <NavItem>
          <Link to="/profile">Profile</Link>
        </NavItem>
        <NavItem>
          <Link to="/logout">Log Out</Link>
        </NavItem>
      </Navbar>
    );
  }
}

export default NavBar;
