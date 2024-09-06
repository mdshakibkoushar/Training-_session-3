import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
import "./MovieItem.css";

const MovieItem = ({ movie }) => {
  const { favorites, addFavorite, removeFavorite } = useContext(MovieContext);
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating / 2); // TMDB rating is out of
    const halfStar = rating % 2 >= 1;

    return Array.from({ length: totalStars }, (_, index) => {
      if (index < fullStars) {
        return (
          <span key={index} className="star filled">
            ★
          </span>
        );
      } else if (index === fullStars && halfStar) {
        return (
          <span key={index} className="star half-filled">
            ★
          </span>
        );
      } else {
        return (
          <span key={index} className="star">
            ★
          </span>
        );
      }
    });
  };

  return (
    <div className="movie-item">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster"
      />
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <div className="rating">{renderStars(movie.vote_average)}</div>
        <button
          onClick={handleFavoriteClick}
          className={`favorite-button ${isFavorite ? "active" : ""}`}
        >
          {isFavorite ? "Unfavorite" : "Favorite"}
        </button>
        <Link to={`/movie/${movie.id}`} className="view-details">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default MovieItem;
