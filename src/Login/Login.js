import { useState } from 'react'
import Notification from '../components/Notification'
import loginService from '../services/login'
import { navigate } from '@reach/router'

const Login = ({ handleLogin }) => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedJeffUser', JSON.stringify(user))

      handleLogin(user)
      await navigate('/')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className="Log-On">
      <h1>Log in</h1>
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