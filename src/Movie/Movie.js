import axios from 'axios';
import React, { useState } from 'react';
import 'bulma/css/bulma.css';


function Movie(props) {

  const apikey = `e9b51b88`

  const [movie, setMovie] = useState("");
  const [plot, setPlot] = useState("Click to reveal plot")


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
    <div className="movie-card">
    <div style={
      {
        padding: "3.5%",
        color: "black",
        //backgroundImage: "url(" + `https://media4.giphy.com/media/H4DjXQXamtTiIuCcRU/giphy.gif?cid=ecf05e47cfbn2m78dq1ov8ycabyq6kbyw0wsmmoliam0dt34&rid=giphy.gif` + ")"
      }



    } className="movieContainer">

      <div className="columns">

      <div className="column is-one-third">

      <div className="movie-poster">
      <img src={movie.Poster} />
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
        <p onClick={() => {
          setPlot(movie.Plot)
        }}>{plot}</p>

      </div>

      <div className="boring-labels">

        <p>{`Country: ${movie.Country} Rated: ${movie.Rated}`}</p>

      </div>

      <p>{`id: ${props.id}`}</p>
      </div>
      </div>
      </div>
    </div>
    </div>
  )
};


export default Movie;