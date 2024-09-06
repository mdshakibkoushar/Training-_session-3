import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";

const Favorites = () => {
  const { favorites, removeFavorite } = useContext(MovieContext);

  const handleRemove = (id) => {
    removeFavorite(id);
  };

  return (
    <div className="favorites">
      <Typography variant="h4" component="h1" gutterBottom>
        Favorites
      </Typography>

      <Grid container spacing={3}>
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {movie.title}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/movie/${movie.id}`}
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2, mb: 1 }}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={() => handleRemove(movie.id)}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1"></Typography>
        )}
      </Grid>
    </div>
  );
};

export default Favorites;
