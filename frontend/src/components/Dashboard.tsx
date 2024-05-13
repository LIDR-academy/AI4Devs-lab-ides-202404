import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h1>Recruiter Dashboard</h1>
      <Link to="/add-candidate">
        <Button>Add New Candidate</Button>
      </Link>
    </div>
  );
};

export default Dashboard;