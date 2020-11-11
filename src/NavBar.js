import React from 'react';
import { Link } from '@reach/router';

const NavBar = ({ user, handleLogout }) => {
  return (
      <nav className="level">
        <p className="level-item has-text-centered">
          <Link className="link is-info" to="/">Search</Link>
        </p>
        <p className="level-item has-text-centered">
          <Link className="link is-info" to="/charts">Charts</Link>
        </p>
        <p className="level-item has-text-centered">
          <Link to="/">
            <img src="https://i.imgur.com/HgkDDe5.png" id="fixed-height" alt="Jeffwatch"/>
          </Link>
        </p>
          {user && <p className="level-item has-text-centered"><Link className="link is-info" to={`/user/${user.username}`}>{user.username}</Link></p>}
          {user && <p className="level-item has-text-centered"><Link onClick={handleLogout} className="link is-info" to="/">Logout</Link></p>}
          {!user && <p className="level-item has-text-centered"><Link className="link is-info" to="/login">Login</Link></p>}
          {!user && <p className="level-item has-text-centered"><Link className="link is-info" to="/signup">Sign Up</Link></p>} 
      </nav>
      
  );
}

export default NavBar;