import React from "react";
import "./App.css";
import { Button, Dropdown, Modal, DropdownButton } from "react-bootstrap";
import { services } from "./services/services";
import { connect } from "react-redux";
import * as actionCreators from "./actions/actions";

class UpdateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      title: this.props.index.title,
      description: this.props.index.description,
      due_date: this.props.index.due_date,
      status: this.props.index.status
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
  }
  handleChange(event) {
    //console.log(event.target.value.name);
    //debugger;

    this.setState({ [event.target.name]: event.target.value });
  }

  handleDropdown(event) {
    this.setState({ status: event.target.innerText });
  }

  handleSubmit(event, id) {
    //var password = event.target.value;
    //debugger;
    this.setState({ show: false });
    event.preventDefault();
    services
      .updateTask(this.state, id)
      .then(Response => {
        this.props.getData(Response.data);
      })
      .catch(error => console.log(error));
    //console.log(Document.cookie);
    //debugger;
    console.log(this.props.page);
    services
      .taskList({ page: this.props.page })
      .then(Response => {
        this.props.getData(Response.data);
      })
      .catch(error => console.log(error));
  }

  render() {
    const handleClose = () => {
      this.setState({ show: false });
    };
    const handleShow = () => {
      this.setState({ show: true });
      //debugger;
    };

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Update Task
        </Button>

        <Modal
          show={this.state.show}
          onHide={handleClose}
          animation
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Body>
            <form
              onSubmit={event => this.handleSubmit(event, this.props.index.id)}
            >
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  defaultValue={this.props.index.title}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  data-length={10}
                  defaultValue={this.props.index.description}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label>
                Due Date:
                <input
                  type="date"
                  name="due_date"
                  defaultValue={this.props.index.due_date}
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
    data: state.TaskListReducer.data,
    role: state.AuthReducer.Role,
    max: state.TaskListReducer.max,
    id: state.AuthReducer.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getData: data => dispatch(actionCreators.getTaskData(data)),
    userProfile: data => dispatch(actionCreators.userProfile(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateModal);
