import React from 'react';
import { Router } from '@reach/router';
import NavBar from './NavBar';
import Search from './Search/Search';
import Movie from './Movie/Movie';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div id="app">
      <NavBar />
      
      <Router>
        <Search path="/" />
        <Movie path="/movie/:id" />
        {/* <Chart path="/chart" /> */}
        {/* <Profile path="/:user" /> */}
      </Router>
    </div>
  );
}

/*
  OMDB documentation: http://www.omdbapi.com/
  Reach Router documentation: https://reach.tech/router/

  *movie === tv show for our purposes*

  Search
    Search for movies, displaying a list of results. Clicking on a movie takes you
    to the Movie route. Needs to have autocomplete using debouncing, per the final 
    project guidelines.

  Movie
    Detailed stats of movie. id is the imdb id. Also displays recent ratings (For example:
      https://rateyourmusic.com/release/album/fishmans/98_12_28-%E7%94%B7%E9%81%94%E3%81%AE%E5%88%A5%E3%82%8C-98_12_28-otokotachi-no-wakare/
      scroll to bottom to see recent ratings)
    Recent ratings also show the user who rated it. Clicking the rating takes you to the profile 
    of the user who rated it, the Profile route.

  Chart
    Chart will display movies in OUR database (not from ombd). Movies will be added to out database after
    a JeffWatch user has rated it. Able to sort in various ways.

  Profile
    User profile. Shows user's ratings. Also shows backlog, movies that the user wants to watch
    but hasn't yet. Users are able to rate movies and add to backlog from the Movie route.

*/

export default App;
