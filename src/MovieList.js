import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieExplorer = () => {
  const [movieList, setMovieList] = useState([]);
  const [fetchError, setFetchError] = useState(""); // Renamed for clarity

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const apiUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
        const response = await axios.get(`${apiUrl}/movies`);
        setMovieList(response.data);
        setFetchUrl(""); // Clear previous error messages if fetch is successful
      } catch (error) {
        const errorMessage = error.response
          ? `${error.response.data.message} (Status code: ${error.response.status})`
          : "Error fetching movies: Network or server issue";
        setFetchError(errorMessage);
      }
    };

    fetchAllMovies();
  }, []);

  const handleViewDetails = (movieId) => {
    console.log("View details for movie", movieId);
  };

  const handleAddMovie = () => {
    console.log("Add new movie logic here");
  };

  return (
    <div>
      <h1>Movie Explorer</h1>
      <button onClick={handleAddMovie}>Add New Movie</button>
      {fetchError && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          <strong>Error:</strong> {fetchError}
        </div>
      )}
      <ul>
        {movieList.map((movie) => (
          <li key={movie.id}>
            {movie.title} - {movie.releaseYear}
            <button onClick={() => handleViewDetails(movie.id)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieExplorer;