import axios from 'axios';
import React, { useState } from 'react';


function Movie(props) {

  const apikey = `e9b51b88`
  const movieName = `Shrek`

  // <Movie path="/movie/:id" />


  const [movie, setMovie] = useState("");


  React.useEffect(() => {
    fetchMovie()
  }, [])

  let i = 0;

  const fetchMovie = async () => {

    try {
      const result = await axios({
        method: 'get',
        url: `http://www.omdbapi.com/?i=${props.id}&apikey=${apikey}`
      })

      console.log(`Movie JSON: ${JSON.stringify(result)}`);
      setMovie(result.data)



    } catch (error) {
      console.log(error);
    }

  };





  return (
    <div className="movieContainer">
      <h1>Movie</h1>

      <div className="movie-title">
        <h3>{movie.Title}</h3>
      </div>

      <div className="movie-poster">
        <img src={movie.Poster} />
      </div>

      <div className="movie-body">
        <p>{movie.Plot}</p>
      </div>

      <p>{`id: ${props.id}`}</p>
    </div>
  )
};


export default Movie;