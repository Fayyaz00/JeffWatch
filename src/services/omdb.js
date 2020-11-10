import axios from 'axios'
const baseURL = 'https://jeffwatch.herokuapp.com/api/omdb'

const omdbSearch = async (query) => {
  return await axios.get(baseURL + '/search/' + query)
}

const omdbGetById = async (id) => {
  return await axios.get(baseURL + '/' + id)
}

export default { omdbSearch, omdbGetById }