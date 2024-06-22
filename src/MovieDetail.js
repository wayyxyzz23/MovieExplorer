import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const MovieDetail = ({ movieId }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${API_ID}/movies/${movieId}`);
        setMovie(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching movie: {error}</div>;
  return (
    <div>
      {movie && (
        <>
          <h2>{movie.title}</h2>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Release Year:</strong> {movie.releaseYear}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Description:</strong> {movie.description}</p>
          <button onClick={() => alert('Edit functionality is not implemented.')}>Edit Movie Details</button>
        </>
      )}
    </div>
  );
};
export default MovieDetail;