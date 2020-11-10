import axios from 'axios'

const login = async credentials => {
  const baseUrl = 'https://jeffwatch.herokuapp.com/api/login'
  const result = await axios.post(baseUrl, credentials)
  return result.data
}

export default { login }