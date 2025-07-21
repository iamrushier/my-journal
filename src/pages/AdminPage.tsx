import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  deleteUserByUsername,
  createAdminUser,
  clearAppCache,
} from "../../api/api_calls";
import { User } from "../../types";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
  TextField,
  Snackbar,
  Alert,
  Grid,
  Paper,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { AddCircleOutline, Delete, VpnKey } from "@mui/icons-material";

const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newAdmin, setNewAdmin] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [feedback, setFeedback] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  } | null>(null);
  const [openCreateAdminDialog, setOpenCreateAdminDialog] = useState(false);

  const fetchUsers = async () => {
    try {
      const fetched = await getAllUsers();
      setUsers(fetched);
    } catch (err) {
      console.error("Error fetching users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (username: string) => {
    try {
      await deleteUserByUsername(username);
      setUsers(users.filter((u) => u.userName !== username));
      setFeedback({
        open: true,
        message: "User deleted successfully",
        severity: "success",
      });
    } catch (err) {
      console.error("Error deleting user", err);
      setFeedback({
        open: true,
        message: "Error deleting user",
        severity: "error",
      });
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAdminUser(newAdmin);
      setNewAdmin({ userName: "", email: "", password: "" });
      fetchUsers(); // Refresh the user list
      setOpenCreateAdminDialog(false);
      setFeedback({
        open: true,
        message: "Admin user created successfully",
        severity: "success",
      });
    } catch (err) {
      console.error("Error creating admin user", err);
      setFeedback({
        open: true,
        message: "Error creating admin user",
        severity: "error",
      });
    }
  };

  const handleClearCache = async () => {
    try {
      await clearAppCache();
      setFeedback({
        open: true,
        message: "App cache cleared successfully",
        severity: "success",
      });
    } catch (err) {
      console.error("Error clearing cache", err);
      setFeedback({
        open: true,
        message: "Error clearing cache",
        severity: "error",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAdmin((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <CircularProgress />;

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Left Column: Actions */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Admin Actions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Button
              variant="contained"
              startIcon={<AddCircleOutline />}
              onClick={() => setOpenCreateAdminDialog(true)}
              fullWidth
            >
              Create Admin User
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<Delete />}
              onClick={handleClearCache}
              fullWidth
              sx={{ mt: 2 }}
            >
              Clear Weather API Cache
            </Button>
          </Paper>
        </Grid>

        {/* Right Column: User List */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              User Management
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {users.length === 0 ? (
              <Typography>No users found.</Typography>
            ) : (
              users.map((user) => (
                <Card key={user.userName} sx={{ mb: 2 }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="h6">{user.userName}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Roles: {user.roles?.join(", ")}
                      </Typography>
                    </Box>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(user.userName)}
                    >
                      <Delete />
                    </IconButton>
                  </CardContent>
                </Card>
              ))
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Create Admin Dialog */}
      <Dialog
        open={openCreateAdminDialog}
        onClose={() => setOpenCreateAdminDialog(false)}
        PaperProps={{
          component: "form",
          onSubmit: handleCreateAdmin,
        }}
      >
        <DialogTitle>Create New Admin</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new admin user, please fill out the form below.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="userName"
            name="userName"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            value={newAdmin.userName}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={newAdmin.email}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={newAdmin.password}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateAdminDialog(false)}>
            Cancel
          </Button>
          <Button type="submit" startIcon={<VpnKey />}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Snackbar */}
      {feedback && (
        <Snackbar
          open={feedback.open}
          autoHideDuration={6000}
          onClose={() => setFeedback(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setFeedback(null)}
            severity={feedback.severity}
            sx={{ width: "100%" }}
          >
            {feedback.message}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default AdminPage;
