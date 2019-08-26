import React from "react";
import "./App.css";
import { Button, Dropdown, Modal, DropdownButton } from "react-bootstrap";
import { connect } from "react-redux";
import { services } from "./services/services";
import * as actionCreators from "./actions/actions";

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      title: "",
      description: "",
      due_date: "",
      status: "Assigned",
      assignedTo: this.props.id
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
    debugger;
    this.setState({ show: false, assignedTo: this.props.id }, () => {
      services
        .addTask(this.state)
        .then(res => console.log(res))
        .catch(e => console.log(e));
    });
  }

  render() {
    const handleClose = () => {
      this.setState({ show: false });
    };
    const handleShow = () => {
      this.setState({ show: true });
    };

    return (
      <>
        {this.props.type === "assign" && (
          <Button onClick={handleShow}>Assign Task</Button>
        )}
        {this.props.type === "self" && (
          <a href="#!" onClick={handleShow}>
            Add Task
          </a>
        )}

        <Modal
          show={this.state.show}
          onHide={handleClose}
          animation
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  required
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  required
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label>
                Due Date:
                <input
                  type="date"
                  name="due_date"
                  required
                  onChange={this.handleChange}
                />
              </label>
              <div>
                <DropdownButton
                  id="dropdown-basic-button"
                  title={this.state.status}
                >
                  <Dropdown.Item value="Assigned" onClick={this.handleDropdown}>
                    Assigned
                  </Dropdown.Item>
                  <Dropdown.Item
                    value="In Progress"
                    onClick={this.handleDropdown}
                  >
                    In Progress
                  </Dropdown.Item>
                  <Dropdown.Item
                    value="Completed"
                    onClick={this.handleDropdown}
                  >
                    Completed
                  </Dropdown.Item>
                </DropdownButton>
              </div>
              <br />
              <Button type="submit" value="Submit" style={{ float: "left" }}>
                {" "}
                Submit
              </Button>
              <Button onClick={handleClose} style={{ float: "right" }}>
                Close
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => {
  //debugger;
  return {
    Name: state.AuthReducer.Name,
    Email: state.AuthReducer.Email,
    Role: state.AuthReducer.Role,
    id: state.AuthReducer.id
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
)(AddTask);
