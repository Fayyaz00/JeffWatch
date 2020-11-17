import React, { useCallback, useState } from 'react';
import SearchResults from './SearchResults';
import ClipLoader from 'react-spinners/ClipLoader'
import omdbService from '../services/omdb';
import { debounce } from 'lodash'

const Search = () => {
  const placeholder = 'Search for a movie';
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const movieRequest = async (mySearch) => {
    console.log(mySearch)
    try {
      setIsLoading(true);
      const result = await omdbService.omdbSearch(mySearch);
      setMovies(result.data.Search);
      setIsLoading(false);
      setIsLoaded(true);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }

  
  const debouncedSearch = useCallback(debounce(mySearch => movieRequest(mySearch), 750), [])

  return (
    <div className="center">
      
      <form 
        onSubmit={e => {e.preventDefault();}}
      >
        <div className="columns">
          <div className="column is-two-thirds is-offset-2">
            <div className="block">
              <label htmlFor="search">
                <input className="input is-info is-large is-rounded" 
                  id="search" 
                  placeholder={placeholder}
                  value={search}
                  onChange={e => {
                    setSearch(e.target.value);
                    setIsLoading(true);
                    debouncedSearch(e.target.value);
                  }} 
                />
              </label>
            </div>
          </div>
        </div>
        
      </form>
      {isLoaded && <SearchResults movies={movies} />}
      {isLoading && <ClipLoader 
            size='150px'
            css={{display: 'block', margin: '0 auto'}}
          />}
      
    </div>
  );
}

export default Search;