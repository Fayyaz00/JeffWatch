import { useState, useEffect } from 'react'
import { Link } from '@reach/router'
import Rating from 'react-rating'

const RecentMovieRatings = ({ ratings }) => {
  const [sortedRatings, setSortedRatings] = useState([])
  
  useEffect(() => {
    setSortedRatings(ratings.sort((a,b) => new Date(b.date) - new Date(a.date)))
  }, [ratings])

  return (
    <div className="recent-movie-ratings">
      <h2>Recent Ratings</h2>
      {ratings.length <= 0 ? <p>No recent Ratings</p> : 
      sortedRatings.map(r => (
        <div className="recent-movie-rating" key={r.user.username}>
          <p>{(new Date(r.date)).toLocaleString().split(', ')[0]}</p>
          <Rating 
            initialRating={r.rating}
            readonly
            emptySymbol="fa fa-star-o"
            fullSymbol="fa fa-star"
          />
          <Link to={`/user/${r.user.username}`}><h3>{r.user.username}</h3></Link>
        </div>
      ))}
    </div>
  )
}

export default RecentMovieRatings