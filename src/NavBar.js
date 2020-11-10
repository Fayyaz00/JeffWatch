import React from 'react';
import { Link } from '@reach/router';

const NavBar = () => {
  return (
    <header>
      <nav className="navbar" role="navigation">
        <div className="navbar-brand">
        <Link className="navbar-item" to="/">JeffWatch</Link>
        <Link className="navbar-item" to="/">My Profile</Link>
        <Link className="navbar-item" to="/login">Login</Link>
        <Link className="navbar-item" to="/signup">Sign Up</Link>
        </div>

      </nav>
    </header>
  );
}

export default NavBar;