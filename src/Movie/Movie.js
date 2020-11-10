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
              {user && <MovieRating />}
              <p className="movie-release">{movie.Released}</p>
              <p className="movie-director">{`Director: ${movie.Director}`}</p>
              <p className="movie-writer">{`Writer: ${movie.Writer}`}</p>
              <p className="movie-actors">{`Actors: ${movie.Actors}`}</p>
              <p onClick={() => setPlot(movie.Plot)}>{plot}</p>
            </div>
            <div className="boring-labels">
              <p>{`Country: ${movie.Country} Rated: ${movie.Rated}`}</p>
            </div>
            <p>{`id: ${id}`}</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Movie;