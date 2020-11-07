import React, { useState } from 'react';
import SearchResults from './SearchResults';

const Search = () => {
  const placeholder = 'Search for a movie';
  const apiKey = 'e9b51b88'; //omdb api key. 100,000 requests per day. 
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const requestMovies = async () => {
    try {
      const result = await fetch(`http://www.omdbapi.com/?s=${search}&apikey=${apiKey}`);
      const resultJson = await fetchResult.json();
      setMovies(resultJson.Search);
      setIsLoaded(true);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <form 
        onSubmit={e => {
          e.preventDefault();
          requestMovies();
        }}
      >
        <label htmlFor="search">
          Movie
          <input 
            id="search" 
            placeholder={placeholder}
            value={search}
            onChange={e => setSearch(e.target.value)} 
          />
        </label>
        <button>Search</button>
      </form>
      {isLoaded && <SearchResults movies={movies} />}
    </div>
  );
}

export default Search;