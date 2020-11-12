import axios from 'axios'
const baseUrl = 'https://jeffwatch.herokuapp.com/api/charts'

const getChart = async (isTop, year) => {
  const result = await axios.get(baseUrl)
  return result.data
}

export default { getChart }