import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert,
} from "@mui/material";
import { login } from "../../api/api_calls";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const token = await login({ userName, password });
      localStorage.setItem("jwt", token);
      navigate("/dashboard"); // Or your desired authenticated route
    } catch (err) {
      setError("Invalid username or password.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 360 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Welcome Back
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate("/signup")}>
          Don't have an account? Sign up
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
