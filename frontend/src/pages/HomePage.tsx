import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const HomePage = () => {
  const isAuthenticated = localStorage.getItem('jwt');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Box
      sx={{
        textAlign: 'center',
        mt: 10,
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
        Welcome to My Journal
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        Your personal space to write, reflect, and grow.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          component={Link}
          to="/login"
          sx={{ px: 3 }}
        >
          Login
        </Button>

        <Button
          variant="outlined"
          component={Link}
          to="/signup"
          sx={{ px: 3 }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
