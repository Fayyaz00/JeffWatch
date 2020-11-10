import React, { useState } from 'react';
import SearchResults from './SearchResults';
import Notification from '../components/Notification';
import omdbService from '../services/omdb';

const Search = () => {
  const placeholder = 'Search for a movie';
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);


  const movieRequest = async() => {
    try {
      const result = await omdbService.omdbSearch(search);
      setMovies(result.data.Search);
      setIsLoaded(true);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div>
      <form 
        onSubmit={e => {
          e.preventDefault();
          movieRequest();
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
      <Notification message={error} />
    </div>
  );
}

export default Search;