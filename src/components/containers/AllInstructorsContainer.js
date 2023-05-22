import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteInstructorThunk, fetchAllInstructorsThunk } from "../../store/thunks";
import { AllInstructorsView } from "../views";

function AllInstructorsContainer() {
  // Get the allInstructors and deleteInstructor state from the Redux store
  const allInstructors = useSelector((state) => state.allInstructors);

  // takes an instructorId parameter and dispatches the deleteInstructorThunk action creator with the instructorId parameter passed as an argument.
  const deleteInstructor = (instructorId) => {
    dispatch(deleteInstructorThunk(instructorId));
  };

  // Get a reference to the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Fetch all instructors when the component mounts
  useEffect(() => {
    dispatch(fetchAllInstructorsThunk());
  }, [dispatch]);

  // Render the AllInstructorsView component with the retrieved data as props
  return <AllInstructorsView allInstructors={allInstructors} deleteInstructor={deleteInstructor} />;
}

export default AllInstructorsContainer;
