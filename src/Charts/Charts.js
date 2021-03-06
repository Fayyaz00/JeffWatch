import { useEffect, useState } from 'react'
import ChartItem from './ChartItem'
import chartsService from '../services/charts'

const Charts = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    getChart()
  }, [])

  const getChart = async () => {
    try {
      const result = await chartsService.getChart()
      setMovies(result.sort((a,b) => b.avgRating - a.avgRating || b.numRatings - a.numRatings))
    } catch {

    }
  }


  return (
    <div className="charts">
      <h1 className="subtitle has-text-centered">Top Ratings from JeffWatch Users</h1>
      <div className="chart-list">
        {movies.map(m => (
          <ChartItem 
            key={m.imdbId}
            movie={m}
          />
        ))}
      </div>
    </div>
  )
}

export default Charts