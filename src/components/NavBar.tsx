import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-[#007BA7] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-2xl ml-12">
          Matchable
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:underline">Sessions</Link>
          </li>
          <li>
            <Link to="/booking" className="hover:underline mr-12">Booking</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
