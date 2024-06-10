import React, { useState, useEffect } from 'react';

const moviesData = [
  { id: 1, title: 'Inception', year: '2010', director: 'Christopher Nolan' },
];

function MovieExplorer() {
  const [movies, setMovies] = useState(moviesData);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [newMovie, setNewMovie] = useState({ title: '', year: '', director: '' });

  const handleMovieSelect = (movieId) => {
    setSelectedMovie(movies.find(movie => movie.id === movieId));
  };

  const handleAddMovie = (event) => {
    event.preventDefault();
    const movieToAdd = { ...newMovie, id: Math.max(...movies.map(movie => movie.id)) + 1 };
    setMovies([...movies, movieToAdd]);
    setNewMovie({ title: '', year: '', director: '' });
  };

  const handleInputChange = (event) => {
    setNewMovie({ ...newMovie, [event.target.name]: event.target.value });
  };

  return (
    <div className="MovieExplorer">
      <header>
        <h1>Movie Explorer</h1>
      </header>
      <section className="movie-list">
        <h2>Movie List</h2>
        <ul>
          {movies.map(movie => (
            <li key={movie.id} onClick={() => handleMovieSelect(movie.id)}>
              {movie.title} ({movie.year})
            </li>
          ))}
        </ul>
      </section>
      {selectedMovie && (
        <section className="movie-details">
          <h2>Movie Details</h2>
          <p>Title: {selectedMovie.title}</p>
          <p>Year: {selectedMovie.year}</p>
          <p>Director: {selectedMovie.director}</p>
        </section>
      )}
      <section className="add-movie">
        <h2>Add a New Movie</h2>
        <form onSubmit={handleAddMovie}>
          <input
            type="text"
            name="title"
            value={newMovie.title}
            onChange={handleInputChange}
            placeholder="Title"
            required
          />
          <input
            type="text"
            name="year"
            value={newMovie.year}
            onChange={handleInputChange}
            placeholder="Year"
            required
          />
          <input
            type="text"
            name="director"
            value={newMovie.director}
            onChange={handleInputChange}
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