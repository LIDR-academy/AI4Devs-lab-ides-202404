#### PROMPT:
From this user story:
#### Add Candidate to System

*As* a recruiter,
I *want* to have the ability to add candidates to the ATS system,
*So* you can manage your data and selection processes efficiently.

##### Criteria of acceptance

*Feature Accessibility:* There must be a clearly visible button or link to add a new candidate from the main page of the recruiter dashboard.
*Data entry form:* When selecting the add candidate option, a form must be submitted that includes the necessary fields to capture the candidate's information such as first name, last name, email, telephone, address, education, and work experience.
Data validation:* The form must validate the data entered to ensure that it is complete and correct. For example, the email must be in a valid format and required fields must not be empty.
*Document upload:* The recruiter must have the option to upload the candidate's CV in PDF or DOCX format.
*Confirmation of addition:* Once the form is completed and the information is sent, a confirmation message should appear indicating that the candidate has been successfully added to the system.
*Errors and exception handling:* In case of an error (e.g. failure to connect to the server), the system should display an appropriate message to the user to inform them of the problem.
*Accessibility and compatibility:* The functionality must be accessible and compatible with different devices and web browsers.
Grades:

The interface should be intuitive and easy to use to minimize the training time required for new recruiters.
Consider integrating autocomplete functionality for the education and work experience fields, based on pre-existing data in the system.

##### Technical Tasks

- Implement the user interface for the add candidate form.
- Develop the backend necessary to process the information entered in the form.
-Ensure the security and privacy of the candidate's data.

using @Codebase lets create 3 tickets with the following format:
##### Qualification
##### Description
##### Criteria of acceptance
     -
     -
##### Priority
##### Estimation
#### Cursor:
Ticket 1: Implement Add Candidate User Interface
Qualification
Frontend Development
Description
Create a user interface for adding a candidate to the ATS system. This interface should include a form with fields for first name, last name, email, telephone, address, education, and work experience, and an option to upload a CV.
Criteria of acceptance
A visible button or link on the main page of the recruiter dashboard to add a new candidate.
A form that captures all necessary candidate information.
The form should include validation for required fields and proper formats (e.g., email format).
An option to upload documents (PDF or DOCX format).
Responsive design to ensure compatibility across devices and browsers.
Priority
High
Estimation
3 days
---
Ticket 2: Backend Implementation for Candidate Addition
Qualification
Backend Development
Description
Develop the backend functionality to process and store the information submitted through the "Add Candidate" form. This includes handling the form submission, validating the data, saving it to the database, and handling file uploads.
Criteria of acceptance
API endpoint to receive form data and files.
Validation logic to ensure data completeness and correctness.
Proper error handling to manage server failures or data issues.
Secure handling and storage of sensitive candidate data.
Priority
High
Estimation
4 days
---
Ticket 3: Integration and Testing of Add Candidate Feature
Qualification
Full Stack Development and QA
Description
Integrate the frontend and backend components of the "Add Candidate" feature. Ensure the entire flow from data entry to data storage works seamlessly and securely. Implement unit and integration tests.
Criteria of acceptance
Successful integration of frontend and backend.
Confirmation message upon successful addition of a candidate.
Comprehensive error and exception handling.
Unit and integration tests to cover the new functionality.
Accessibility checks to ensure the feature is usable on various devices and browsers.
Priority
Medium
Estimation
2 days
---
These tickets outline the development process for adding a candidate to the ATS system, ensuring a clear division of tasks and focused criteria for testing and acceptance.
- - -
#### PROMPT:
now we will focus on ticket 1. On @frontend use react-router so the root path will be a dashboard and '/addCandidate' will have the form. the navigation between screns willbe made using links on a header
#### Cursor:
To implement navigation for the "Add Candidate" form using React Router in your frontend application, you'll need to set up routes and a navigation header. Here's a concise guide on how to achieve this:
Step 1: Setup React Router
First, ensure that react-router-dom is installed in your project. If it's not installed, you can add it using npm or yarn:
``npm install react-router-dom``
or
``yarn add react-router-dom``

Step 2: Configure Routes
In your main application file (usually App.js or index.js), import BrowserRouter, Routes, and Route from react-router-dom and set up your routes.
```
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddCandidate from './components/AddCandidate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/addCandidate" element={<AddCandidate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```
Step 3: Create Navigation Header
Create a header component that includes links to navigate between your dashboard and the add candidate form.
```
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/addCandidate">Add Candidate</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
```
Step 4: Include Header in App
Make sure to include the Header component in your main application layout so that it appears on all pages.
```
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/addCandidate" element={<AddCandidate />} />
      </Routes>
    </BrowserRouter>
  );
}
```
This setup will allow users to navigate between the dashboard and the add candidate form using the links provided in the header.
- - -
#### PROMPT:
on @AddCandidate.tsx  create the form for ticket 1
#### Cursor:
To create the form for adding a candidate as specified in Ticket 1, you can enhance the AddCandidate.tsx component to include form fields, validation, and a file upload option. Here's how you can structure this component using controlled components in React:
```
import React, { useState } from 'react';

function AddCandidate() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
    address: '',
    education: '',
    workExperience: '',
    resume: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission, e.g., sending data to the backend
    console.log(formData);
    alert('Candidate Added Successfully!');
  };

  return (
    <div>
      <h1>Add Candidate</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Telephone:
          <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} />
        </label>
        <label>
          Address:
          <textarea name="address" value={formData.address} onChange={handleChange} />
        </label>
        <label>
          Education:
          <textarea name="education" value={formData.education} onChange={handleChange} />
        </label>
        <label>
          Work Experience:
          <textarea name="workExperience" value={formData.workExperience} onChange={handleChange} />
        </label>
        <label>
          Resume (PDF or DOCX):
          <input type="file" name="resume" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
        </label>
        <button type="submit">Add Candidate</button>
      </form>
    </div>
  );
}

export default AddCandidate;
```

- - -
De acá en adelate solo pondré los prompts. Tambien, en muchas ocasiones era mas sencillo usar el autocompletado de copilot++ 
- - - 
#### PROMPT:
for form validation lets use Formik with the useFormik hook
#### PROMPT:
use TextInput for the form inputs
#### PROMPT:
lets create a button component on @Button.tsx 
#### PROMPT:
now the OnSubmit function will send the data as JSON to the POST /candidate endpoint of the backend rest API with path as env variable 'REACT_APP_BACKEND_URL'
#### PROMPT:
resume is going to be send as multipart to POST /candidate/:id/resume after the POST  /candidate is successful
#### PROMPT:
now start with the ticket 2. On @schema.prisma add the table candidate with columns send on @AddCandidate.tsx and resume with candidateid and path
#### PROMPT:
create the endpoints POST  /candidate and POST /candidate/:id/resume on @candidateRoutes.ts  according as they are used on @AddCandidate.tsx 
#### PROMPT:
add cors handling