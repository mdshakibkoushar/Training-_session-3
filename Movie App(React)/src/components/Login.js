import React, { useState } from "react";
import { TextField, Button, Typography, Container, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simple authentication check
    if (username === "admin" && password === "shakib") {
      // Save user login state here, e.g., in localStorage or a global state
      localStorage.setItem("loggedIn", "true");
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 3, mb: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Admin Login
      </Typography>
      <Typography variant="h6" component="h1" gutterBottom align="center">
        username:-admin | password:-shakib
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
        sx={{ mt: 3 }}
      >
        Login
      </Button>
    </Container>
  );
};

export default Login;
