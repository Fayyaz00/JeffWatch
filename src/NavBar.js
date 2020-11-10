import React from 'react';
import { Link } from '@reach/router';

const NavBar = () => {
  return (
    <header>
      <nav>
        <Link to="/">JeffWatch</Link>
        <Link to="/">My Profile</Link>
        <Link to="/login">Login</Link>
        <Link to="/SignUp">Sign Up</Link>

      </nav>
    </header>
  );
}

export default NavBar;