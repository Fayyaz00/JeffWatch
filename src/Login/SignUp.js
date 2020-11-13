import React, { useState } from 'react';
import Notication from '../components/Notification'
import usersService from '../services/users'
import loginService from '../services/login'
import { navigate } from '@reach/router';

const SignUp = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPass, setVerifyPass] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== verifyPass) {
      setErrorMessage('Passwords do not match')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }
    if (username.length > 20) {
      setErrorMessage('Username must be 20 characters or less')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }
    if (username.length < 3) {
      setErrorMessage('Username must be 3 characters or more')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }
    if (!username.match('^[A-Za-z0-9]+$')) {
      setErrorMessage('Username can only contain characters and numbers')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }
    if (password.length < 6) {
      setErrorMessage('Password must be 6 characters or more')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }
    if (password.length > 50) {
      setErrorMessage('why is your password more than 50 characters...')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }
    try {
      const result = await usersService.createUser(username, password)
      if (result.status === 200) {
        const user = await loginService.login({ username, password })
        window.localStorage.setItem('loggedJeffUser', JSON.stringify(user))

        handleLogin(user)
        navigate('/')
      }
    } catch (error) {
      let message = 'Error with signup'
      if (error.response
        && error.response.data
        && error.response.data.error
        && error.response.data.error.toLowerCase().startsWith('user validation failed')) {
          message = "Username is taken"
        }

      if (error.response
        && error.response.data
        && error.response.data.message) {
          message = error.response.message
        }
      setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 10000)
    }
  }

  return (
  <section className="hero is-info is-fullheight">
    <div className="hero-body">
    <div className="isCenter">
    <div className="SignUp">
    <div className="container">
      <div className="box">
      <form onSubmit={handleSubmit}>
        <div className="field">
        <div className="username-form">
          <label className="label">Username</label>
          <div className="control has-icons-left">
            <input 
              className="input"
              type="text" 
              value={username}
              name="username" 
              onChange={({ target }) => setUsername(target.value)}
              minLength="3" 
              required 
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user"></i>
            </span>
        </div>
        </div>
        </div>
        <div className="field">
        <div className="password-form">
          <label className="label">Password</label>
          <div className="control has-icons-left">
            <input 
              className="input"
              type="password"
              value={password}
              name="password" 
              onChange={({ target }) => setPassword(target.value)} 
              minLength="6" 
              required 
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </div>
        </div>
        </div>
        <div className="field">
        <div className="password-form">
          <label className="label">Verify Password</label>
            <div className="control has-icons-left">
            <input 
              className="input"
              type="password"
              value={verifyPass}
              name="password" 
              onChange={({ target }) => setVerifyPass(target.value)} 
              minLength="6" 
              required 
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
            <p className="help is-danger">
            {errorMessage}
            </p>
            </div>
        </div>
        </div>
        <div className="field is-grouped">
        <button className="button is-info" type="submit">Sign Up</button>
        </div>
      </form>
      </div>
    </div>
    </div>
    </div>
    </div>
  </section>
  )
}

export default SignUp