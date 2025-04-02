import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[var(--primary-color)] p-4 text-white">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:underline">Home</Link>
        </li>
        <li>
          <Link to="/login" className="hover:underline">Login</Link>
        </li>
        <li>
          <Link to="/register" className="hover:underline">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;