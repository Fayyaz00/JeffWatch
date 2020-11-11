import { useEffect, useState } from 'react'
import Rating from 'react-rating'
import ratingsService from '../services/ratings'
import ClipLoader from 'react-spinners/ClipLoader'

const MovieRating = ({ initialRating, movieId }) => {
  const [newRating, setNewRating] = useState(null)
  const [myRating, setMyRating] = useState(null)
  const [myInitialRating, setMyInitialRating] = useState(initialRating)
  const [hasRating, setHasRating] = useState(initialRating ? true : false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let isMounted = true
    setMyInitialRating(initialRating)
    setHasRating(initialRating ? true : false)

    return () => {isMounted = false}
  }, [initialRating])

  const updateRating = async (movieId, rating) => {
    try {
      setIsLoading(true)
      if (!hasRating) {
        await ratingsService.createRating(movieId, rating)
      } else {
        await ratingsService.updateRating(movieId, rating)
      }
      setHasRating(true)
      setIsLoading(false)
      setMyRating(rating)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  const deleteRating = async () => {
    try {
      setIsLoading(true)
      await ratingsService.deleteRating(movieId)
      setMyRating(null)
      setMyInitialRating(null)
      setHasRating(false)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  return (
    <div className="ratings">
      <Rating
        initialRating={myRating || myInitialRating}
        emptySymbol="fa fa-star-o"
        fullSymbol="fa fa-star"
        fractions={2}
        onHover={(rate) => setNewRating(rate)}
        onChange={(rate) => updateRating(movieId, rate)}
      />
      {isLoading ? 
        <ClipLoader size='24px' css={{marginLeft: '10px'}} /> : 
        <div id="rating-value" 
          onMouseEnter={() => setNewRating('--')}
          onMouseLeave={() => setNewRating()}
          onClick={() => deleteRating()}>
          {newRating || myRating || myInitialRating || '--'}
        </div>}
    </div>
  )
}

export default MovieRating