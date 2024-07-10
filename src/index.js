import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const fetchMovies = async (search term) => {
  const apiKey = 'YOUR_API_KEY';
  const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=${apiKey}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  const data = await response.json();
  return data.Search;
};

class MovieExplorer extends React.Component {
  state = {
    movies: [],
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.searchMovies('Batman');
  }

  searchMovies = async (searchTerm) => {
    this.setState({ isLoading: true, error: null });
    try {
      const movies = await fetchMovies(searchTerm);
      this.setState({ movies, isLoading: false });
    } catch (error) {
    this.setState({ error: error.message, isLoading: false });
    }
  };

  render() {
    const { movies, isLoading, error } = this.state;
    
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div>
        <h1>Movie Explorer</h1>
        {movies && movies.map(movie => (
          <div key={movie.imdbID}>{movie.Title}</div>
        ))}
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictNode>
    <App />
  </React.StrictNode>,
  document.getElementById('root')
);