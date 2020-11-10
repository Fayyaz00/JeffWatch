import axios from 'axios'

const login = async credentials => {
  const baseUrl = 'http://jeffwatch.herokuapp.com/api/login'
  const result = await axios.post(baseUrl, credentials)
  return result.data
}

export default { login }