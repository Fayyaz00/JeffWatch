import React from 'react';

const MovieCard = ({ title, year, poster }) => {
  // https://picsum.photos/seed/picsum/300/450?grayscale&blur=5
  // placeholder image api : https://picsum.photos/
  // Some poster links are broken, need to find a way to add placeholder images
  let image = 'https://picsum.photos/300/450?blur=2';
  if (poster != 'N/A') {
    image = poster;
  }
  
  return (
    <div>
      <img src={image}></img>
      <h2>{title} ({year})</h2>
    </div>
  );
}

export default MovieCard;