const NewInstructorView = (props) => {
  const { handleChange, handleSubmit, error } = props;

  return (
    <div className="root">
      {/* container for new instructor form */}
      <div className="formContainer">
        {/* title for new instructor form */}
        <div className="formTitle">
          <h2 style={{ fontWeight: "bold", fontFamily: "Courier, sans-serif", fontSize: "20px", color: "#11153e" }}>New Instructor</h2>
        </div>

        {/* form for adding new instructor */}
        <form style={{ textAlign: "center" }} onSubmit={(e) => handleSubmit(e)}>
          <label style={{ color: "#11153e", fontWeight: "bold" }}>First Name: </label>
          <input type="text" name="firstname" onChange={(e) => handleChange(e)} />
          <br />
          <br />

          <label style={{ color: "#11153e", fontWeight: "bold" }}>Last Name: </label>
          <input type="text" name="lastname" onChange={(e) => handleChange(e)} />
          <br />
          <br />

          <label style={{ color: "#11153e", fontWeight: "bold" }}>Department: </label>
          <input type="text" name="department" onChange={(e) => handleChange(e)} />
          <br />
          <br />

          <button type="submit">Submit</button>
          <br />
          <br />
        </form>

        {/* display error message if there is one */}
        {error !== "" && <p>{error}</p>}
      </div>
    </div>
  );
};

export default NewInstructorView;
