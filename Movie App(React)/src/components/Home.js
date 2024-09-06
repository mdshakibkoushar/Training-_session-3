import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MovieContext } from "../context/MovieContext";
import MovieItem from "./MovieItem";
import SearchIcon from "@mui/icons-material/Search";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import "./Home.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [selectedYear, setSelectedYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { movies, setMovies, setDetailedMovies } = useContext(MovieContext);

  const fetchMovies = async (page = 1, searchQuery = "") => {
    try {
      let url = `https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${page}`;
      if (searchQuery) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&query=${searchQuery}&page=${page}`;
      }
      const response = await axios.get(url);
      setMovies(response.data.results);
      setDetailedMovies(response.data.results);
      setTotalPages(Math.min(response.data.total_pages, 200)); // Limit totalPages to 200
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page
    fetchMovies(1, query); // Pass query to fetchMovies
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value.includes("Sort by")) {
      setSortBy(value.split(": ")[1].toLowerCase());
      setSelectedYear("");
    } else if (value.includes("Filter by Year")) {
      setSelectedYear(value.split(": ")[1]);
      setSortBy("title");
    }
  };

  const filteredAndSortedMovies = () => {
    let filtered = selectedYear
      ? movies.filter(
          (movie) =>
            new Date(movie.release_date).getFullYear() ===
            parseInt(selectedYear)
        )
      : movies;

    return filtered.sort((a, b) => {
      if (sortBy === "year") {
        return new Date(b.release_date) - new Date(a.release_date);
      } else if (sortBy === "rating") {
        return b.vote_average - a.vote_average;
      } else {
        return a.title.localeCompare(b.title);
      }
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchMovies(newPage, query); // Pass query to fetchMovies
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top
    }
  };

  return (
    <div className="home">
      <div className="search-bar">
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Enter movie title..."
          />
          <SearchIcon className="search-icon" onClick={handleSearch} />
        </div>
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      <div className="sort-filter-options">
        <label htmlFor="sort-filter">Sort/Filter By:</label>
        <select id="sort-filter" onChange={handleSelectChange}>
          <option value="Sort by: Title">Title</option>
          <option value="Sort by: Year">Year</option>
          <option value="Sort by: Rating">Rating</option>
          <option value="Filter by Year: 2022">2022</option>
          <option value="Filter by Year: 2023">2023</option>
          <option value="Filter by Year: 2024">2024</option>
        </select>
      </div>

      <div className="movie-list">
        {filteredAndSortedMovies().length > 0 ? (
          filteredAndSortedMovies().map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))
        ) : (
          <p className="no-movies">
            No movies found. Try a different search term or filter.
          </p>
        )}
      </div>

      <div className="pagination-controls">
        <button
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ArrowBackIosNew /> {/* Left Arrow */}
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <ArrowForwardIos /> {/* Right Arrow */}
        </button>
      </div>
    </div>
  );
};

export default Home;
