import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useLocation, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import { getCurrentUser } from "../../api/api_calls";
import { User } from "../../types";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("jwt");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<User | null>(null);

  const isAdminPage = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (isLoggedIn) {
      getCurrentUser()
        .then(setUser)
        .catch(() => {
          // Handle error, e.g., token expired
          handleLogout();
        });
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
    setAnchorEl(null);
    navigate("/login");
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileNavigation = () => {
    navigate("/user");
    handleMenuClose();
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
                <IconButton color="inherit" onClick={handleMenuOpen}>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      minWidth: 200,
                    },
                  }}
                >
                  <MenuItem disabled>
                    <Typography variant="subtitle1">
                      {user?.userName}
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleProfileNavigation}>
                    <ListItemIcon>
                      <EditIcon fontSize="small" />
                    </ListItemIcon>
                    Edit Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
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
