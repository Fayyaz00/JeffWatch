import { useState } from 'react'
import Rating from 'react-rating'

const MovieRating = () => {
  const [rating, setRating] = useState(null)

  const SVGIcon = (props) => (
    <svg className={props.className} pointerEvents="none">
      <use xlinkHref={props.href} />
    </svg>
  )

  return (
    <div className="ratings">
      <Rating 
        // emptySymbol={<SVGIcon href="#icon-star-empty" className="icon" />}
        // fullSymbol={<SVGIcon href="#icon-star-full" className="icon" />}
        emptySymbol="fa fa-star-o"
        fullSymbol="fa fa-star"
        fractions={2}
        onHover={(rate) => setRating(rate)}
      />
      <div id="rating-value">{rating || '--'}</div>
    </div>
  )
}

export default MovieRating