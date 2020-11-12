import { Link } from '@reach/router'

const ChartItem = ({ movie }) => {
  const { numRatings, avgRating, genre, imdbId, poster, title, releaseDate } = movie
  return (
    <div className="chart-item">
      <Link to={`/movie/${imdbId}`}><img src={poster} alt={title}/></Link>
      <div className="chart-item-info">
        <Link to={`/movie/${imdbId}`}><h3>{title}</h3></Link>
        <p>{(new Date(releaseDate)).toLocaleString().split(', ')[0]}</p>
        <p>{genre.join(', ')}</p>
      </div>
      <div>
        <p><strong>{avgRating}</strong> / 5.0 from <strong>{numRatings}</strong> ratings</p>
      </div>
    </div>
  )
}

export default ChartItem