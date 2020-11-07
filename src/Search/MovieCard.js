import React from 'react';
import { Link } from '@reach/router';

const MovieCard = ({ id, title, year, poster }) => {
  // https://picsum.photos/seed/picsum/300/450?grayscale&blur=5
  // placeholder image api : https://picsum.photos/
  // Some poster links are broken, need to find a way to add placeholder images
  let image = 'https://picsum.photos/300/450?blur=2';
  if (poster !== 'N/A') {
    image = poster;
  }
  
  return (
    <Link to={`/movie/${id}`}>
    <div>
      <img src={image} alt={`${title} poster`}></img>
      <h2>{title} ({year})</h2>
    </div>
    </Link>
  );
}

export default MovieCard;