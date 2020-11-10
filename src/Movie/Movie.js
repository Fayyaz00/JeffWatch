import { useState, useEffect } from 'react';
import omdbService from '../services/omdb';
import 'bulma/css/bulma.css';


function Movie(props) {

  const [movie, setMovie] = useState("");
  const [plot, setPlot] = useState("Click to reveal plot")

  useEffect(() => {
    fetchMovie(props.id)
  }, [props.id])

  const fetchMovie = async (id) => {
    try {
      const result = await omdbService.omdbGetById(id);
      setMovie(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
            <h6>{movie.Released}</h6>
          </div>
          <div className="is-family-sans-serif">
            <div className="movie-body">
              <p className="movie-director">{`Director: ${movie.Director}`}</p>
              <p className="movie-writer">{`Writer: ${movie.Writer}`}</p>
              <p className="movie-actors">{`Actors: ${movie.Actors}`}</p>
              <p onClick={() => setPlot(movie.Plot)}>{plot}</p>
            </div>
            <div className="boring-labels">
              <p>{`Country: ${movie.Country} Rated: ${movie.Rated}`}</p>
            </div>
            <p>{`id: ${props.id}`}</p>
          </div>
        </div>
      </div>
    </div>
  )
};


export default Movie;