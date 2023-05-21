import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchInstructorThunk, editInstructorThunk } from "../../store/thunks";

class EditInstructorContainer extends Component {
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

  // set state with values from redux store on mount
  componentDidMount() {
    // getting instructor ID from url
    this.props.fetchInstructor(this.props.match.params.id);
    this.setState({
      firstname: this.props.instructor.firstname,
      lastname: this.props.instructor.lastname,
      department: this.props.instructor.department,
    });
  }

  // update state on form input change
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // submit form and dispatch edit instructor thunk
  handleSubmit = async (event) => {
    event.preventDefault();

    // form validation
    if (!this.state.firstname || this.state.firstname === "") {
      this.setState({ error: "Error: First name cannot be empty" });
      return;
    }
    if (!this.state.lastname || this.state.lastname === "") {
      this.setState({ error: "Error: Last Name cannot be empty" });
      return;
    }
    if (!this.state.department || this.state.department === "") {
      this.setState({ error: "Error: Department cannot be empty" });
      return;
    }

    // get new info for instructor from form input
    let instructor = {
      id: this.props.instructor.id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      department: this.state.department,
    };

    // dispatch edit instructor thunk
    await this.props.editInstructor(instructor);

    // set state to redirect to single instructor view of edited instructor
    this.setState({
      redirect: true,
      redirectId: this.props.instructor.id,
    });
  };

  // reset redirect state on unmount
  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  render() {
    let { instructor } = this.props;

    // redirect to single instructor view of edited instructor if redirect state is true
    if (this.state.redirect) {
      return <Redirect to={`/instructor/${this.state.redirectId}`} />;
    }

    return (
      <div>
        {/* form for editing instructor info */}
        <form style={{ textAlign: "center" }} onSubmit={(e) => this.handleSubmit(e)}>
          <label style={{ color: "#11153e", fontWeight: "bold" }}>First Name: </label>
          <input type="text" name="firstname" value={this.state.firstname || ""} placeholder={instructor.firstname} onChange={(e) => this.handleChange(e)} />
          <br />

          <label style={{ color: "#11153e", fontWeight: "bold" }}>Last Name: </label>
          <input type="text" name="lastname" value={this.state.lastname || ""} placeholder={instructor.lastname} onChange={(e) => this.handleChange(e)} />
          <br />

          <label style={{ color: "#11153e", fontWeight: "bold" }}>Department: </label>
          <input type="text" name="department" value={this.state.department || ""} placeholder={instructor.department} onChange={(e) => this.handleChange(e)} />
          <br />

          <button type="submit">Submit</button>
        </form>

        {/* error message display */}
        {this.state.error !== "" && <p>{this.state.error}</p>}
      </div>
    );
  }
}

// map state to props
const mapState = (state) => {
  return {
    instructor: state.instructor,
  };
};

// map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    fetchInstructor: (id) => dispatch(fetchInstructorThunk(id)),
    editInstructor: (instructor) => dispatch(editInstructorThunk(instructor)),
  };
};

// connect component to redux store
export default connect(mapState, mapDispatch)(EditInstructorContainer);
