import axios from 'axios'
const baseUrl = 'https://jeffwatch.herokuapp.com/api/users'

const getUser = async (user) => {
  return await axios.get(baseUrl + '/' + user)
}

const createUser = async (username, password) => {
  const bodyParams = {
    username,
    password,
  }

  return await axios.post(baseUrl, bodyParams)
}

export default { getUser, createUser }