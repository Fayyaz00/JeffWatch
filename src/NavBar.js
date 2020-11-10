import React from 'react';
import { Link } from '@reach/router';

const NavBar = ({ user }) => {
  console.log(user)
  return (
    <header>
      <nav className="navbar" role="navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">JeffWatch</Link>
          {user && <Link className="navbar-item" to="/">{user.username}</Link>}
          {!user && <Link className="navbar-item" to="/login">Login</Link>}
          {!user && <Link className="navbar-item" to="/signup">Sign Up</Link>}
        </div>
      </nav>
    </header>
  );
}

export default NavBar;