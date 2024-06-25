import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const MovieDetail = ({ movieId }) => {
  const [movie, setMovie] = useState(null);
  const [extraInfo, setExtraInfo] = useState(null); // State to hold additional movie info
  const [loading, setLoading] = useState(true);
  const [loadingExtra, setLoadingExtra] = useState(false); // Loading state for additional info
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${API_URL}/movies/${movieId}`); // Corrected from API_ID to API_URL
        setMovie(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  // Mock function to simulate fetching additional movie info
  const fetchAdditionalInfo = async () => {
    try {
      setLoadingExtra(true);
      // Simulated API call
      const response = await new Promise(resolve => setTimeout(() => resolve({
        data: {
          rating: 'PG-13',
          runtime: '2h 13min',
        }
      }), 1000));
      setExtraInfo(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingExtra(false);
    }
  };

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
          {extraInfo && (
            <>
              <p><strong>Rating:</strong> {extraInfo.rating}</p>
              <p><strong>Runtime:</strong> {extraInfo.runtime}</p>
            </>
          )}
          <button onClick={() => fetchAdditionalInfo()} disabled={loadingExtra}>
            {loadingExtra ? 'Loading...' : 'Show More Details'}
          </button>
          <button onClick={() => alert('Edit functionality is not implemented.')}>Edit Movie Details</button>
        </>
      )}
    </div>
  );
};

export default MovieDetail;