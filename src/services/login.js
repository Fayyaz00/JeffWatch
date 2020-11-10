import axios from 'axios'
const baseUrl = 'https://jeffwatch.herokuapp.com/api/login'

const login = async credentials => {
  const result = await axios.post(baseUrl, credentials)
  return result.data
}

export default { login }