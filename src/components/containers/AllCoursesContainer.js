import { Component } from "react";
import { connect } from "react-redux";
import { fetchAllCoursesThunk, deleteCourseThunk } from "../../store/thunks";
import AllCoursesView from "../views/AllCoursesView";

class AllCoursesContainer extends Component {
  componentDidMount() {
    this.props.fetchAllCourses();
  }
  render() {
    return <AllCoursesView courses={this.props.allCourses} deleteCourse={this.props.deleteCourse} />;
  }
}

// Map state to props;
const mapState = (state) => {
  return {
    allCourses: state.allCourses,
  };
};

// Map dispatch to props;
const mapDispatch = (dispatch) => {
  return {
    fetchAllCourses: () => dispatch(fetchAllCoursesThunk()),
    deleteCourse: (courseId) => dispatch(deleteCourseThunk(courseId)),
  };
};

export default connect(mapState, mapDispatch)(AllCoursesContainer);
