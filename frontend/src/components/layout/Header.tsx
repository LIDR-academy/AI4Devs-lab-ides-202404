import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className='bg-gray-200'>
      <nav>
        <ul className='flex gap-2 py-4 px-6'>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/addCandidate">Add Candidate</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

