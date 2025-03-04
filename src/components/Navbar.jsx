import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul className='public-nav'>
        <li>Logo</li>
        <li>Home</li>
        <li>Gestion MVP</li>
        <li>
          <Link to="/login">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  )
};

export default Navbar;