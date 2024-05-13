import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h1>Recruiter Dashboard</h1>
      <Link to="/add-candidate">
        <button>Add New Candidate</button>
      </Link>
    </div>
  );
};

export default Dashboard;