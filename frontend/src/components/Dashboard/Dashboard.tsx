import './Dashboard.css';
import Sidebar from '../Sidebar/Sidebar';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <header>
          <h1>Recruiter Dashboard</h1>
        </header>
        <div className="content">
        </div>
      </div>
    </div>
  );
};

export default Dashboard;