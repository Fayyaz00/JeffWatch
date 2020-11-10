import React from 'react';
import { Link } from '@reach/router';
import 'bulma/css/bulma.css';



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
    <section className="hero is-info">
    <div className="container" id="centered">
      <h2 className="title" id="blue-text">{title} ({year})</h2>
      <div id="blue-background">
      <img className="poster-size" src={image} alt={`${title} poster`}></img> 
      </div>
    </div>
    </section>
    </Link>
  );
}

export default MovieCard;