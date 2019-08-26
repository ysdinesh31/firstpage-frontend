import React from "react";
import "./App.css";
import { Button, Table, Pagination, Preloader } from "react-materialize";
import { InputGroup, FormControl } from "react-bootstrap";
import { services } from "./services/services";
import { connect } from "react-redux";
import AddTask from "./AddTask";
import * as actionCreators from "./actions/actions";

class UserListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      max: 5,
      user: "",
      searchName: "",
      searchEmail: "",
      searchCreatedBy: "",
      loading: true
    };
    this.getInfo = this.getInfo.bind(this);
    this.setState = this.setState.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getProfile();
    this.getInfo();
  }

  handleChange(event) {
    console.log(event.target);
    //debugger;
    this.setState(
      { [event.target.name]: event.target.value, page: 1 },
      this.getInfo
    );
  }
  render() {
    if (this.state.loading) return <Preloader size="big"></Preloader>;

    return (
      <div>
        <Table className="table">
          <thead>
            <tr>
              <th data-field="name" style={{ textAlign: "center" }}>
                <InputGroup
                  size="sm"
                  className="mb-3"
                  onChange={this.handleChange}
                >
                  <FormControl
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    placeholder="search"
                    name="searchName"
                  />
                </InputGroup>
                Name
              </th>
              <th data-field="email" style={{ textAlign: "center" }}>
                <InputGroup
                  size="sm"
                  className="mb-3"
                  onChange={this.handleChange}
                >
                  <FormControl
                    aria-label="Small"
                    placeholder="search"
                    aria-describedby="inputGroup-sizing-sm"
                    name="searchEmail"
                  />
                </InputGroup>
                email
              </th>
              {this.props.role === "Admin" && (
                <>
                  <th data-field="created_by" style={{ textAlign: "center" }}>
                    <InputGroup
                      size="sm"
                      className="mb-3"
                      onChange={this.handleChange}
                    >
                      <FormControl
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        placeholder="search"
                        name="searchCreatedBy"
                      />
                    </InputGroup>
                    Created By
                  </th>
                  <th data-field="role" style={{ textAlign: "center" }}>
                    role
                  </th>

                  <th data-field="Process" style={{ textAlign: "center" }}>
                    Process
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody style={{ height: "30px", widht: "50px" }}>
            {this.props.data.map(index => (
              <tr>
                <td
                  style={{
                    height: "30px",
                    widht: "50px",
                    textAlign: "center"
                  }}
                >
                  {index.name}
                </td>
                <td
                  style={{
                    height: "30px",
                    widht: "50px",
                    textAlign: "center"
                  }}
                >
                  {index.email}
                </td>
                {this.props.role === "Admin" && (
                  <>
                    <td style={{ textAlign: "center" }}>{index.created_by}</td>
                    <td style={{ textAlign: "center" }}>{index.role}</td>

                    <td style={{ textAlign: "center", width: "40%" }}>
                      <div>
                        {!index.delete_name &&
                          this.props.role === "Admin" &&
                          index.role !== "Admin" && (
                            <Button
                              waves="light"
                              small
                              style={{ marginRight: "5px" }}
                              onClick={() => this.onDelete(index.id)}
                            >
                              Delete
                            </Button>
                          )}
                        {index.role === "User" && this.props.role === "Admin" && (
                          <Button
                            waves="light"
                            small
                            style={{ marginRight: "5px" }}
                            onClick={() => this.onChangeRole(index.id)}
                          >
                            Change Role
                          </Button>
                        )}
                        <AddTask assignee={index.id} type="assign" />
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          style={{ marginLeft: "20%", marginTop: "30px" }}
          activePage={this.state.page}
          maxButtons={3}
          items={this.props.max}
          onSelect={this.handlePageChange.bind(this)}
        />
      </div>
    );
  }

  onDelete(i) {
    //debugger;
    services
      .deleteUser(i)
      .then(() => {
        console.log("deleted");
        this.getInfo();
      })
      .catch(error => console.log(error));
    //debugger;
  }

  onChangeRole(i) {
    //debugger;
    services
      .changeUserRole(i)
      .then(() => {
        this.getInfo();
        //this.props.changeRole(i);
      })
      .catch(error => console.log(error));
    //debugger;
  }

  getProfile() {
    services
      .profile()
      .then(Response => {
        this.props.userProfile(Response.data);
      })
      .catch(error => {
        if (error.response.status === 401) {
          //debugger;
          this.props.history.push("/logout");
        }
      });
  }

  getInfo() {
    //debugger;

    services
      .userList(this.state)
      .then(Response => {
        this.props.getData(Response.data);
        //debugger;
        this.setState({ loading: false });
      })
      .catch(error => console.log(error));
    //debugger;
  }

  handlePageChange(pageNumber) {
    //debugger;
    this.setState(
      {
        page: pageNumber
      },
      () => this.getInfo()
    );
    //debugger;
  }
}
const mapStateToProps = state => {
  //debugger;
  return {
    data: state.ListReducer.data,
    role: state.AuthReducer.Role,
    max: state.ListReducer.max
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getData: data => dispatch(actionCreators.getUserData(data)),
    userProfile: data => dispatch(actionCreators.userProfile(data)),
    logout: () => dispatch(actionCreators.logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListing);
