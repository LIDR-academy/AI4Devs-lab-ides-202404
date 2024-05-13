import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; 

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>LTI</h2>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/add-candidate">Add Candidate</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;