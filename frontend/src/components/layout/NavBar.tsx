import React from "react";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">LTI</div>
        <div>
          <a
            href="/"
            className="px-4 hover:text-blue-300 focus:text-blue-300 transition duration-300 ease-in-out"
          >
            Home
          </a>
          <a
            href="/about"
            className="px-4 hover:text-blue-300 focus:text-blue-300 transition duration-300 ease-in-out"
          >
            About
          </a>
          <a
            href="/candidates"
            className="px-4 hover:text-blue-300 focus:text-blue-300 transition duration-300 ease-in-out"
          >
            Candidates
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
