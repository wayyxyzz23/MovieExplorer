import React, { useState } from 'react';
import axios from 'axios';

const AddMovieForm = () => {
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    director: '',
    releaseDate: '',
    rating: ''
  });

  const handleChange = (e) => {
    logAction(`Handling input change for ${e.target.name}`);
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    logAction("Submitting form");
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/movies`, movie);
      logAction('Movie added successfully', response.data);
      // Reset form fields after submission
      setMovie({
        title: '',
        description: '',
        director: '',
        releaseDate: '',
        rating: ''
      });
    } catch (error) {
      // Improved error handling  
      const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message;
      console.error('Failed to add movie:', errorMessage);
      logAction('Failed to add movie', errorMessage);
    }
  };

  // Log action function to centralize the logging logic
  const logArray = (message, data = '') => {
    console.log(`${new Date().toISOString()} - ${message}`, data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={movie.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" name="description" value={movie.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Director:</label>
        <input type="text" name="director" value={movie.director} onChange={handleChange} required />
      </div>
      <div>
        <label>Release Date:</label>
        <input type="date" name="releaseDate" value={movie.releaseDate} onChange={handleChange} required />
      </div>
      <div>
        <label>Rating:</label>
        <input type="number" name="rating" value={movie.rating} onChange={handleChange} required min="1" max="10" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddMovieForm;