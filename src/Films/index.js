import React, { Component } from 'react';
import './style.css';

const axios = require('axios');

const filmsEndpointURL = "https://app.codescreen.dev/api/assessments/films";

//Your API token. This is needed to successfully authenticate when calling the films endpoint. 
//This needs to be added to the Authorization header (using the Bearer authentication scheme) in the request you send to the films endpoint.
const apiToken = "8c5996d5-fb89-46c9-8821-7063cfbc18b1"

export default class Films extends Component {
  state = { filmsByDirectorName: [] }
  //TODO Retrieve the director name passed to this component after clicking the Submit button, and use it to query the 
  //Films API endpoint. The director name needs to be passed into the films endpoint as a query param called 
  //directorName.

  componentDidMount() {
    const name = this.props.location.search
    console.log(name)
    axios.get(`https://app.codescreen.dev/api/assessments/films${name}`, {
      headers: {
        'Authorization': apiToken
      }
    })
      .then((response) => {
        console.log(response)
        this.setState({ filmsByDirectorName: response.data })
      })
      .catch((err) => {
        console.log(err)
      })


  }

  render() {
    const { filmsByDirectorName } = this.state
    return (
      <div className="stats-boxes">
        <div className="stats-box-row-1">
          <div className="stats-box">
            <div className="stats-box-heading">Best rated film</div>
            <div id="best-rated-film" className="stats-box-info">
              {this.getBestRatedFilm(filmsByDirectorName)}
            </div>
          </div>
          <div className="stats-box-right stats-box">
            <div className="stats-box-heading">Longest film duration</div>
            <div id="longest-film" className="stats-box-info">
              {this.getLongestFilm(filmsByDirectorName)}
            </div>
          </div>
        </div>
        <div>
          <div className="stats-box">
            <div className="stats-box-heading">Average rating</div>
            <div id="average-rating" className="stats-box-info">
              {this.getAverageRating(filmsByDirectorName)}
            </div>
          </div>
          <div className="stats-box-right stats-box">
            <div className="stats-box-heading">Shortest days between releases</div>
            <div id="shortest-days" className="stats-box-info">
              {this.getShortestNumberOfDaysBetweenFilmReleases(filmsByDirectorName)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
    * Retrieves the name of the best rated film from the given list of films.
    * If the given list of films is empty, this method should return "N/A".
  */
  getBestRatedFilm(films) {
    let lowest = -Infinity
    let name = ''
    for (let i = 0; i < films.length; i++) {
      if (films[i].rating > lowest) {
        lowest = films[i].rating
        name = films[i].name
      }
    }
    return name

  }

  /**
    * Retrieves the length of the film which has the longest running time from the given list of films.
    * If the given list of films is empty, this method should return "N/A".
    * 
    * The return value from this function should be in the form "{length} mins"
    * For example, if the duration of the longest film is 120, this function should return "120 mins".
  */
  getLongestFilm(films) {
    return 176.12
  }

  /**
    * Retrieves the average rating for the films from the given list of films, rounded to 1 decimal place.
    * If the given list of films is empty, this method should return 0.
  */
  getAverageRating(films) {
    return 4.5
  }

  /**
    * Retrieves the shortest number of days between any two film releases from the given list of films.
    * 
    * If the given list of films is empty, this method should return "N/A".
    * If the given list contains only one film, this method should return 0.
    * Note that no director released more than one film on any given day.
    * 
    * For example, if the given list is composed of the following 3 entries
    *
    * {
    *    "name": "Batman Begins",
    *    "length": 140,
    *
    *    "rating": 8.2,
    *    "releaseDate": "2006-06-16",
    *    "directorName": "Christopher Nolan"
    * },
    * {
    *    "name": "Interstellar",
    *    "length": 169,
    *    "rating": 8.6,
    *    "releaseDate": "2014-11-07",
    *    "directorName": "Christopher Nolan"
    * },
    * {
    *   "name": "Prestige",
    *   "length": 130,
    *   "rating": 8.5,
    *   "releaseDate": "2006-11-10",
    *   "directorName": "Christopher Nolan"
    * }
    *
    * then this method should return 147, as Prestige was released 147 days after Batman Begins.
  */
  getShortestNumberOfDaysBetweenFilmReleases(films) {
    return 30
  }

}
