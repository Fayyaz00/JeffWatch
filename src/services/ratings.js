import axios from 'axios'
const baseUrl = 'https://jeffwatch.herokuapp.com/api/ratings'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const createRating = async (movie, rating) => {
  const config = {
    headers: { Authorization: token },
  }

  const bodyParams = {
    movie,
    rating,
  }

  return await axios.post(baseUrl, bodyParams, config)
}

const getRating = async (movie) => {
  const config = {
    headers: { Authorization: token },
  }

  const url = baseUrl + `/${movie}`

  return await axios.get(url, config)
}

const updateRating = async (movie, rating) => {
  const config = {
    headers: { Authorization: token },
  }

  const bodyParams = {
    movie,
    rating,
  }

  return await axios.put(baseUrl, bodyParams, config)
}

const deleteRating = async (movie) => {
  const config = {
    headers: { Authorization: token },
    data: {
      movie,
    },
  }

  return await axios.delete(baseUrl, config)
}

export default { createRating, getRating, updateRating, deleteRating, setToken }