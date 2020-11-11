import { useEffect, useState } from 'react'
import { Link } from '@reach/router'
import Rating from 'react-rating'

const RecentRatings = ({ ratings }) => {
  const sortedRatings = ratings.sort((a,b) => new Date(b.date) - new Date(a.date))
  const maxPage = Math.floor((ratings.length - 1) / 10)
  const [page, setPage] = useState(0)
  const [displayedRatings, setDisplayedRatings] = useState(sortedRatings.slice(page*10, (page+1)*10))

  useEffect(() => {
    setDisplayedRatings(sortedRatings.slice(page*10, (page+1)*10))
  }, [page])

  const previousButton = () => {
    setPage(page - 1)
  }

  const nextButton = () => {
    setPage(page + 1)
  }

  return (
    ratings.length <= 0 
    ? 
    <div className="recent-ratings">
      <div className="recent-ratings-header">
        <h2>Recent Ratings</h2>
      </div>
      <p>No recent ratings</p>
    </div> 
    :
    <div className="recent-ratings">
      <div className="recent-ratings-header">
        <h2>Recent Ratings</h2>
        <button 
          disabled={page === 0}
          onClick={previousButton}
        >previous</button>
        <button 
          disabled={page === maxPage}
          onClick={nextButton}
        >next</button>
      </div>
      {displayedRatings.map(r => (
        <div className="recent-rating" key={r.id}>
          <Rating 
            initialRating={r.rating}
            readonly
            emptySymbol="fa fa-star-o"
            fullSymbol="fa fa-star"
          />
          <p>{(new Date(r.date)).toLocaleString().split(', ')[0]}</p>
          <Link to={`/movie/${r.movie.imdbId}`}><h3>{r.movie.title}</h3></Link>
        </div>
      ))}
    </div>
  )
}

export default RecentRatings