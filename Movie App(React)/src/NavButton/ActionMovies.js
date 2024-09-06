import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MovieContext } from "../context/MovieContext";
import "./ActionMovies.css"; // Ensure you have corresponding CSS

const ActionMovies = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { favorites, addFavorite, removeFavorite } = useContext(MovieContext);

  const fetchMovies = async (page = 1) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${page}`
      );
      const data = response.data;
      if (data.results) {
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 200)); // Limit totalPages to 200
      } else {
        setError("No movies found");
      }
    } catch (err) {
      setError("Failed to fetch movies");
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handleSearch = async () => {
    if (query.trim()) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&query=${query}`
        );
        const data = response.data;
        if (data.results) {
          setMovies(data.results);
          setTotalPages(1); // Reset totalPages for search results
        } else {
          setError("No movies found");
        }
      } catch (err) {
        setError("Failed to fetch search results");
      }
    }
  };

  const handleAddFavorite = (movie) => {
    const isFavorite = favorites.some((fav) => fav.id === movie.id);
    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const isFavorite = (movieId) => {
    return favorites.some((fav) => fav.id === movieId);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchMovies(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top
    }
  };

  return (
    <div className="action-movies">
      <h1>Action Movies Page</h1> {/* Heading added here */}
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <h2 className="movie-title">{movie.title}</h2>
              <p className="movie-release-date">{movie.release_date}</p>
              <button
                onClick={() => handleAddFavorite(movie)}
                className={`favorite-button ${
                  isFavorite(movie.id) ? "favorited" : ""
                }`}
              >
                {isFavorite(movie.id) ? "Unfavorite" : "Favorite"}
              </button>
            </div>
          ))
        ) : (
          <p className="no-movies">
            No movies found. Try a different search term.
          </p>
        )}
      </div>
      <div className="pagination-controls">
        <button
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &lsaquo; {/* Left Arrow */}
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          &rsaquo; {/* Right Arrow */}
        </button>
      </div>
    </div>
  );
};

export default ActionMovies;
