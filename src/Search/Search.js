import React, { useState } from 'react';
import SearchResults from './SearchResults';
import axios from "axios";

const Search = () => {
  const placeholder = 'Search for a movie';
  const apiKey = 'e9b51b88'; //omdb api key. 100,000 requests per day. 
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);


  const movieRequest = async() => {
    try {
      const result = await axios({
        method: 'get',
        url: `http://www.omdbapi.com/?s=${search}&apikey=${apiKey}`,
      });
      const resultjson = await result.data;
      setMovies(resultjson.Search);
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
    </div>
  );
}

export default Search;