import React from 'react';
import MovieCard from './MovieCard';

const SearchResults = ({ movies }) => {

  return (
    <div>
      {!movies || movies.length === 0 ? (
        <h1>No Movies Found</h1>
      ) : (
        movies.map(movie => (
          <MovieCard 
            key={movie.imdbID}
            title={movie.Title} 
            year={movie.Year} 
            poster={movie.Poster}
          />
        ))
      )}
    </div>
  );
}

export default SearchResults;