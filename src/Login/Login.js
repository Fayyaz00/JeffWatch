import React, { useState, useEffect } from 'react'
import Notification from '../components/Notification'
import loginService from '../services/login'

function Login(props) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      props.handleLogin(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className="Log-On">
      <Notification message={errorMessage}/>
      <form onSubmit={handleSubmit}>
        <div className="username-form">
          <label>
            Username:
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
            Password:
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
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login