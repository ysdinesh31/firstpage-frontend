import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Switch
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import UserListing from "./UserListing";
import TaskListing from "./TaskListing";
import Welcome from "./Welcome";
import ForgotPassword from "./ForgotPassword";
import Logout from "./Logout";
import Reset from "./Reset";
import AddTask from "./AddTask";
import { Navbar, NavItem } from "react-materialize";
import { connect } from "react-redux";
import * as actionCreators from "./actions/actions";

class App extends React.Component {
  render() {
    //debugger;
    console.log(this.props.loggedIn);
    //debugger;

    return (
      <Router>
        <td
          style={{
            padding: "10px",
            fontSize: "30px",
            float: "left",
            marginLeft: "2%",
            color: "rgb(1, 71, 88)"
          }}
        >
          Management Portal
        </td>
        <Navbar
          alignLinks="right"
          style={{ backgroundColor: "rgb(1, 71, 88)" }}
        >
          {document.cookie !== "" && (
            <>
              <td style={{ padding: "0px" }}>
                <NavItem>
                  <NavLink
                    to="/welcome"
                    activeStyle={{
                      color: "blue"
                    }}
                  >
                    Home
                  </NavLink>
                </NavItem>
              </td>
              <td style={{ padding: "0px" }}>
                <NavItem>
                  <NavLink
                    to="/userlist"
                    activeStyle={{
                      color: "blue"
                    }}
                  >
                    User List
                  </NavLink>
                </NavItem>
              </td>
              <td style={{ padding: "0px" }}>
                <NavItem>
                  <NavLink
                    to="/tasklist"
                    activeStyle={{
                      color: "blue"
                    }}
                  >
                    Task List
                  </NavLink>
                </NavItem>
              </td>
              <td style={{ padding: "0px" }}>
                <NavItem>
                  <AddTask type="self" assignee="-1" />
                </NavItem>
              </td>
              <td style={{ padding: "0px" }}>
                <NavItem>
                  <NavLink
                    to="/profile"
                    activeStyle={{
                      color: "blue"
                    }}
                  >
                    Profile
                  </NavLink>
                </NavItem>
              </td>
              <td style={{ padding: "0px" }}>
                <NavItem>
                  <NavLink
                    to="/logout"
                    activeStyle={{
                      color: "blue"
                    }}
                  >
                    Log Out
                  </NavLink>
                </NavItem>
              </td>
            </>
          )}
          {document.cookie === "" && (
            <>
              <td style={{ padding: "0px" }}>
                <NavItem>
                  <NavLink
                    to="/login"
                    activeStyle={{
                      color: "blue"
                    }}
                  >
                    Login
                  </NavLink>
                </NavItem>
              </td>
              <td style={{ padding: "0px" }}>
                <NavItem>
                  <NavLink
                    to="/register"
                    activeStyle={{
                      color: "blue"
                    }}
                  >
                    Sign Up
                  </NavLink>
                </NavItem>
              </td>
            </>
          )}
        </Navbar>
        <Switch>
          <GuestRoute
            exact
            path="/login"
            component={Login}
            show="false"
            login={this.props.login.bind(this)}
          />
          <GuestRoute
            exact
            path="/register"
            component={Register}
            show="false"
            login={this.props.login.bind(this)}
          />
          <GuestRoute
            exact
            path="/forgotpassword"
            component={ForgotPassword}
            show="false"
            login={this.props.login.bind(this)}
          />
          <GuestRoute
            path="/reset/:token"
            component={Reset}
            login={this.props.login.bind(this)}
          />

          <AuthRoute
            exact
            path="/profile"
            component={Profile}
            loggedIn={this.props.loggedIn}
            logout={this.props.logout.bind(this)}
          />
          <AuthRoute
            exact
            path="/userlist"
            component={UserListing}
            loggedIn={this.props.loggedIn}
            logout={this.props.logout.bind(this)}
          />
          <AuthRoute
            exact
            path="/tasklist"
            component={TaskListing}
            loggedIn={this.props.loggedIn}
            logout={this.props.logout.bind(this)}
          />
          <AuthRoute
            exact
            path="/welcome"
            component={Welcome}
            loggedIn={this.props.loggedIn}
            logout={this.props.logout.bind(this)}
          />
          <AuthRoute
            exact
            path="/logout"
            component={Logout}
            loggedIn={this.props.loggedIn}
            logout={this.props.logout.bind(this)}
          />
          {/* <AuthRoute exact path="/addtask" component={AddTask} /> */}

          <AuthRoute path="*" component={Welcome} />
          <GuestRoute path="*" component={Login} />
        </Switch>
      </Router>
    );
  }
}

const AuthRoute = ({ component: Component, ...rest }) => {
  const token = document.cookie;
  //debugger;
  if (rest.loggedIn && token === "") rest.logout();
  //debugger;
  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )
      }
    />
  );
};

const GuestRoute = ({ component: Component, ...rest }) => {
  const token = document.cookie;
  //debugger;
  if (token) rest.login();
  return (
    <Route
      {...rest}
      render={props =>
        !token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/welcome"
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.AuthReducer.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actionCreators.logout()),
    login: () => dispatch(actionCreators.login())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
