import { useState, useEffect } from 'react';
import MovieRating from '../components/MovieRating'
import omdbService from '../services/omdb';
import ClipLoader from 'react-spinners/ClipLoader'
import 'bulma/css/bulma.css';


function Movie({ user, id }) {

  const [isLoading, setIsLoading] = useState(true)
  const [movie, setMovie] = useState("");
  const [plot, setPlot] = useState("Click to reveal plot")

  useEffect(() => {
    fetchMovie(id)
  }, [id])

  const fetchMovie = async (id) => {
    try {
      const result = await omdbService.omdbGetById(id);
      setMovie(result.data);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };

  return (
    isLoading 
    ? <ClipLoader 
        size='150px'
        css={{display: 'block', margin: '0 auto'}}
      />  
    : movie.Response === 'False'
    ? <h1>Movie not found</h1> 
    :
    <div className="movie-card">
      <div className="columns">
        <div className="column is-one-third">
          <div className="movie-poster">
            <img src={movie.Poster} alt={movie.Title}/>
          </div>
        </div>
        <div className="column" id="meta-div">
          <div className="movie-header">
            <h1 className="title">{movie.Title}</h1>
            <h6 className="subtitle">{movie.Genre}</h6>
          </div>
          <div className="is-family-sans-serif">
            <div className="movie-body">
              <div className="small-margin">
              {user && <MovieRating />}
              </div>
              <div className="small-margin">
                <p><strong>Average rating:</strong> Vampire Holmes/10</p>
              </div>
              <div className="small-margin">
                <p><strong>Number of ratings:</strong> 69</p>
              </div>
              <div className="small-margin">
              <p className="movie-release">{movie.Released}</p>
              </div>
              <div className="small-margin">
                <p><strong>Runtime:</strong> {movie.Runtime}</p>
              </div>
              <div className="small-margin">
              <p className="movie-director"><strong>Director:</strong> {movie.Director}</p>
              </div>
              <div className="small-margin">
              <p className="movie-writer"><strong>Writer:</strong> {movie.Writer}</p>
              </div>
              <div className="small-margin">
              <p className="movie-actors"><strong>Actors:</strong> {movie.Actors}</p>
              </div>
              <div className="small-margin">
              <p onClick={() => setPlot(movie.Plot)}>{plot}</p>
              </div>
            </div>
            <div className="small-margin">
              <p><strong>Country:</strong> {movie.Country} <strong>Rated:</strong> {movie.Rated}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Movie;