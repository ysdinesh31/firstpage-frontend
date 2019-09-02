import React from "react";
import "./App.css";
import { Pagination, Preloader } from "react-materialize";
import { Button, Table } from "react-bootstrap";
import { InputGroup, FormControl } from "react-bootstrap";
import { services } from "./services/services";
import { connect } from "react-redux";
import UpdateModal from "./UpdateModal";
import * as actionCreators from "./actions/actions";

class TaskListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      max: 5,
      user: "",
      searchTitle: "",
      searchAssignedBy: "",
      count: 1,
      loading: true
    };

    this.getInfo = this.getInfo.bind(this);
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
    //debugger;
    if (this.state.loading) return <Preloader size="big"></Preloader>;
    if (this.props.data) {
      console.log("data:", this.props.data);
      return (
        <div>
          <Table className="table">
            <thead>
              <tr>
                <th data-field="title" style={{ textAlign: "center" }}>
                  <InputGroup
                    size="sm"
                    className="mb-3"
                    onChange={this.handleChange}
                  >
                    <FormControl
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="search"
                      name="searchTitle"
                    />
                  </InputGroup>
                  Title
                </th>
                <th data-field="description" style={{ textAlign: "center" }}>
                  Description
                </th>
                <th data-field="status" style={{ textAlign: "center" }}>
                  Status
                </th>
                <th data-field="due_date" style={{ textAlign: "center" }}>
                  due_date
                </th>
                <th data-field="AssignedBy" style={{ textAlign: "center" }}>
                  <InputGroup
                    size="sm"
                    className="mb-3"
                    onChange={this.handleChange}
                  >
                    <FormControl
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="search"
                      name="searchAssignedBy"
                    />
                  </InputGroup>
                  Assigned By
                </th>
                {this.props.role === "Admin" && (
                  <th data-field="AssignedTo" style={{ textAlign: "center" }}>
                    Assigned To
                  </th>
                )}
                <th
                  data-field="processes"
                  style={{ width: "30%", textAlign: "center" }}
                >
                  Processes
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.data.map(index => (
                <tr key={index.id} style={{ height: "60px" }}>
                  <td style={{ textAlign: "center" }}>{index.title}</td>
                  <td style={{ textAlign: "center" }}>{index.description}</td>
                  <td style={{ textAlign: "center" }}>{index.status}</td>
                  <td style={{ textAlign: "center" }}>{index.due_date}</td>
                  {this.props.role === "Admin" && (
                    <td style={{ textAlign: "center" }}>
                      {index.createdby.name}
                    </td>
                  )}
                  <td style={{ textAlign: "center" }}>
                    {index.assignedto.name}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div>
                      {!index.deletedby &&
                        index.createdby.id === this.props.id && (
                          <Button
                            waves="light"
                            small="true"
                            style={{ marginRight: "5px" }}
                            onClick={() => this.onDelete(index.id)}
                          >
                            Delete
                          </Button>
                        )}
                      {!index.deletedby &&
                        (index.createdby.id === this.props.id ||
                          index.assignedto.id === this.props.id) && (
                          <UpdateModal index={index} page={this.state.page} />
                        )}
                    </div>
                  </td>
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
    } else {
      return null;
    }
  }

  onDelete(i) {
    services
      .deleteTask(i)
      .then(() => {
        console.log("deleted");
        this.getInfo();
      })
      .catch(error => {
        if (error.response.status === 401) this.props.logout();
      });
    //debugger;
  }

  getProfile() {
    services
      .profile()
      .then(Response => {
        this.props.userProfile(Response.data);
      })
      .catch(error => {
        console.log(error.response.status);
        if (error.response.status === 401) {
          //debugger;
          this.props.history.push("/logout");
        }
      });
  }
  getInfo() {
    //debugger;

    services
      .taskList(this.state)
      .then(Response => {
        this.props.getData(Response.data);
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
    data: state.TaskListReducer.data,
    role: state.AuthReducer.Role,
    max: state.TaskListReducer.max,
    id: state.AuthReducer.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getData: data => dispatch(actionCreators.getTaskData(data)),
    userProfile: data => dispatch(actionCreators.userProfile(data)),
    logout: () => dispatch(actionCreators.logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskListing);
