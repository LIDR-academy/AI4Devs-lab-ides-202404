import React from 'react';
import { Button, Typography, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4">Recruiter Dashboard</Typography>
      <Button
        component={Link}
        to="/add-candidate"
        variant="contained"
        color="primary"
        aria-label="Add new candidate"
      >
        Add New Candidate
      </Button>
    </Container>
  );
};

export default Dashboard;
