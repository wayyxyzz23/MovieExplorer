import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieExplorer = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
        const response = await axios.get(`${backendUrl}/movies`);
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const viewDetails = (movieId) => {
    console.log('View details for movie', movieId);
  };

  const addMovie = () => {
    console.log('Add new movie logic here');
  };

  return (
    <div>
      <h1>Movie Explorer</h1>
      <button onClick={addMovie}>Add New Movie</button>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} - {movie.releaseYear}
            <button onClick={() => viewDetails(movie.id)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieExplorer;