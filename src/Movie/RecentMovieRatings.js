import { useState, useEffect } from 'react'
import { Link } from '@reach/router'
import Rating from 'react-rating'

const RecentMovieRatings = ({ ratings }) => {
  const [sortedRatings, setSortedRatings] = useState([])
  
  useEffect(() => {
    setSortedRatings(ratings.sort((a,b) => new Date(b.date) - new Date(a.date)))
  }, [ratings])

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
      </div>
      {sortedRatings.map(r => (
        <div className="recent-rating" key={r.user.username}>
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