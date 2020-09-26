import React, { useState } from 'react';
import SearchResults from './SearchResults';

const Search = () => {
  const placeholder = 'Search for a movie';
  const apiKey = '3ebf8082'; //This is my omdb api key. I get 1000 requests per day. 
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  async function requestMovies() {
    try {
      const fetchResult = await fetch(`http://www.omdbapi.com/?s=${search}&apikey=${apiKey}`);
      const resultJson = await fetchResult.json();
      setIsLoaded(true);
      setMovies(resultJson.Search);
    } catch (error) {
      setError(error);
    }
  }

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