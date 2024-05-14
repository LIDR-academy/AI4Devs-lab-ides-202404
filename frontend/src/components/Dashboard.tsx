import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div style={{ margin: 20 }}>
      <Typography variant="h4" gutterBottom>
        Recruiter Dashboard
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/add-candidate">
        Add Candidate
      </Button>
    </div>
  );
}

export default Dashboard;

