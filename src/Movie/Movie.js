import React from 'react';

const Movie = () => {

  const fetchMovie = async () => {
    try {
      const result = await fetch(`http://www.omdbapi.com/?s=${search}&apikey=${apiKey}`);
      const resultJson = await fetchResult.json();
      setIsLoaded(true);
      setMovies(resultJson.Search);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>

    </div>
  )
};


export default Movie;