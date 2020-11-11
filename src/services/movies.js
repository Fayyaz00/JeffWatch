import axios from 'axios'
const baseUrl = 'https://jeffwatch.herokuapp.com/api/movies'

const getMovieById = async (id) => {
  return await axios.get(baseUrl + '/' + id)
}

export default{ getMovieById }