import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("jwt");

  const isAdminPage = location.pathname.startsWith("/admin");

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: isAdminPage ? "#b71c1c" : "#3f51b5", // Deep red for admin, blue for normal
      }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" sx={{ mr: 1 }}>
          {isAdminPage ? <AdminPanelSettingsIcon /> : <AutoStoriesIcon />}
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate(isAdminPage ? "/admin" : "/")}
        >
          {isAdminPage ? "Admin Panel" : "MyJournal"}
        </Typography>

        {isLoggedIn ? (
          <>
            {isAdminPage ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate("/dashboard")}>
                  Dashboard
                </Button>
                <Button color="inherit" onClick={() => navigate("/user")}>
                  Profile
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/signup")}>
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
