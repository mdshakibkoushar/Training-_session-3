import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import Favorites from "./components/Favorites";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import ActionMovies from "./NavButton/ActionMovies";
import { MovieProvider } from "./context/MovieContext";
import Footer from "./components/Footer";

const AppContent = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  return (
    <>
      {isLoggedIn && location.pathname !== "/login" && <NavBar />}
      <main>
        <Routes>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/favorites"
            element={isLoggedIn ? <Favorites /> : <Navigate to="/login" />}
          />
          <Route
            path="/genre/:genre"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/genre/action"
            element={isLoggedIn ? <ActionMovies /> : <Navigate to="/login" />}
          />
          <Route
            path="/movie/:imdbID"
            element={isLoggedIn ? <MovieDetails /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <MovieProvider>
      {/* <Router> */}
      <AppContent />
      {/* </Router> */}
    </MovieProvider>
  );
};

export default App;
