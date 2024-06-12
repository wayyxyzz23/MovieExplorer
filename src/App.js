import React, { useState } from 'react';

const initialMoviesList = [
  { id: 1, title: 'Inception', year: '2010', director: 'Christopher Nolan' },
];

function MovieExplorer() {
  const [moviesList, setMoviesList] = useState(initialMoviesList);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
  const [movieInput, setMovieInput] = useState({ title: '', year: '', director: '' });

  const selectMovieById = (movieId) => {
    const foundMovie = moviesList.find(movie => movie.id === movieId);
    setSelectedMovieDetails(foundMovie);
  };

  const addNewMovie = (event) => {
    event.preventDefault();
    const newMovieToAdd = { ...movieInput, id: moviesList.length > 0 ? Math.max(...moviesList.map(movie => movie.id)) + 1 : 1 };
    setMoviesList(moviesList.concat(newMovieToAdd));
    setMovieInput({ title: '', year: '', director: '' });
  };

  const updateMovieInputField = (event) => {
    setMovieInput({ ...movieInput, [event.target.name]: event.target.value });
  };

  return (
    <div className="MovieExplorer">
      <header>
        <h1>Movie Explorer</h1>
      </header>
      <section className="movie-list">
        <h2>Movie List</h2>
        <ul>
          {moviesList.map(movie => (
            <li key={movie.id} onClick={() => selectMovieById(movie.id)}>
              {movie.title} ({movie.year})
            </li>
          ))}
        </ul>
      </section>
      {selectedMovieDetails && (
        <section className="movie-details">
          <h2>Movie Details</h2>
          <p>Title: {selectedMovieDetails.title}</p>
          <p>Year: {selectedMovieDetails.year}</p>
          <p>Director: {selectedMovieDetails.director}</p>
        </section>
      )}
      <section className="add-movie">
        <h2>Add a New Movie</h2>
        <form onSubmit={addNewMovie}>
          <input
            type="text"
            name="title"
            value={movieInput.title}
            onChange={updateMovieInputField}
            placeholder="Title"
            required
          />
          <input
            type="text"
            name="year"
            value={movieInput.year}
            onChange={updateMovieInputField}
            placeholder="Year"
            required
          />
          <input
            type="text"
            name="director"
            value={movieInput.director}
            onChange={updateMovieInputField}
            placeholder="Director"
            required
          />
          <button type="submit">Add Movie</button>
        </form>
      </section>
    </div>
  );
}

export default MovieExplorer;