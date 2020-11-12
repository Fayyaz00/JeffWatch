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
    <section className="hero is-info is-fullheight">
    <div className="hero-body">
    <div className="isCenter">
    <div className="container">
      <div>
      <Notification message={errorMessage}/>
      <div className="box">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Username</label>
            <div className="control has-icons-left has-icons-right">
              <input 
                className="input" 
                type="text" 
                value={username}
                name="username"
                onChange={({target}) => setUsername(target.value)}
                required
                />
            <span className="icon is-small is-left">
              <i className="fas fa-user"></i>
            </span>
            </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
            <div className="control has-icons-left has-icons-right">
            <input 
              className="input"
              type="password"
              value={password}
              name="password" 
              onChange={({ target }) => setPassword(target.value)}
              required 
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
            </div>  
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-info" type="submit">Login</button>
          </div>
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

export default Login