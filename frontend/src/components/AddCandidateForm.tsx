const AddCandidateForm = () => {
  return (
    <form>
      <label htmlFor="firstName">First Name:</label>
      <input type="text" id="firstName" name="firstName" required />

      {/* Add other input fields for last name, email, phone, address, education, work experience */}

      <label htmlFor="cvUpload">Upload CV (PDF or DOCX):</label>
      <input type="file" id="cvUpload" name="cvUpload" accept=".pdf,.docx" />

      <button type="submit">Add Candidate</button>
    </form>
  );
};

export default AddCandidateForm;