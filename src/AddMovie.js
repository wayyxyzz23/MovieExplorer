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
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/movies`, movie);
      console.log('Movie added successfully:', response.data);
      setMovie({
        title: '',
        description: '',
        director: '',
        releaseDate: '',
        rating: ''
      });
    } catch (error) {
      console.error('Failed to add movie:', error);
    }
  };

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
        <label>Rating:</line-through>
        <input type="number" name="rating" value={movie.rating} onChange={handleChange} required min="1" max="10" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddMovieForm;