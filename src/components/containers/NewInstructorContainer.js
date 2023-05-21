import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import NewInstructorView from "../views/NewInstructorView";
import { addInstructorThunk } from "../../store/thunks";

class NewInstructorContainer extends Component {
  constructor(props) {
    super(props);
    // set initial state
    this.state = {
      firstname: "",
      lastname: "",
      department: "",
      redirect: false,
      redirectId: null,
      error: "",
    };
  }

  // update state on form input change
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // submit form and dispatch add instructor thunk
  handleSubmit = async (event) => {
    event.preventDefault();

    // form validation
    if (!this.state.firstname || this.state.firstname === "") {
      this.setState({ error: "First Name field is required" });
      return;
    }
    if (!this.state.lastname || this.state.lastname === "") {
      this.setState({ error: "Last Name field is required" });
      return;
    }
    if (!this.state.department || this.state.department === "") {
      this.setState({ error: "Department field is required" });
      return;
    }

    // create new instructor object with form input
    let instructor = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      department: this.state.department,
    };

    // dispatch add instructor thunk and get newly created instructor object
    let newInstructor = await this.props.addInstructor(instructor);

    // set state to redirect to single instructor view of newly created instructor
    this.setState({
      redirect: true,
      redirectId: newInstructor.id,
      error: "",
    });
  };

  componentWillUnmount() {
    // reset redirect state on unmount
    this.setState({ redirect: false, redirectId: null });
  }

  render() {
    // redirect to single instructor view of newly created instructor if redirect state is true
    if (this.state.redirect) {
      return <Redirect to={`/instructor/${this.state.redirectId}`} />;
    }
    // render NewInstructorView with props
    return <NewInstructorView handleChange={this.handleChange} handleSubmit={this.handleSubmit} error={this.state.error} />;
  }
}

// map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    addInstructor: (instructor) => dispatch(addInstructorThunk(instructor)),
  };
};

// connect component to redux store
export default connect(null, mapDispatch)(NewInstructorContainer);
