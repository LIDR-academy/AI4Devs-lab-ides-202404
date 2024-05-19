import React from 'react';
import NavBar from './layout/NavBar'; // Make sure the path is correct

const Home: React.FC = () => {
    return (
      <div>
        <NavBar />
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold">Welcome to LTI</h1>
          <p>
            LTI is a sophisticated software tool that streamlines the
            recruitment process by utilizing cutting-edge technology and
            innovative algorithms. It automates the handling of job applications
            and candidate tracking, significantly enhancing the efficiency and
            effectiveness of the hiring process. By integrating advanced data
            analytics and machine learning, ATS solutions can intelligently
            parse and rank resumes, ensuring that recruiters focus on the most
            promising candidates. This technology not only optimizes recruitment
            workflows but also supports strategic decision-making by providing
            insightful analytics on hiring practices.
          </p>
        </div>
      </div>
    );
};

export default Home;

