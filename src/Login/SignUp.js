import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';

function SignUp() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
  }

  return (
    <div className="SignUp">
      <h1>Sign-Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="username-form">
          <label>
            Username
            <input 
              type="text" 
              value={username}
              name="username" 
              onChange={({ target }) => setUsername(target.value)}
              minLength="3" 
              required 
            />
          </label>
        </div>
        <div className="password-form">
          <label>
            Password
            <input 
              type="password"
              value={password}
              name="password" 
              onChange={({ target }) => setPassword(target.value)} 
              minLength="6" 
              required 
            />
          </label>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp