import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Avatar,
  Switch,
  FormControlLabel,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import {
  getCurrentUser,
  updateUser,
  updateSentimentAnalysis,
  deleteUser,
} from "../../api/api_calls";
import { User } from "../../types";
import ConfirmDialog from "../componenets/ConfirmDialog";
import DeleteConfirmationDialog from "../componenets/DeleteConfirmationDialog";

const UserPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  // State for profile editing
  const [profileEditMode, setProfileEditMode] = useState(false);
  const [isProfileModified, setIsProfileModified] = useState(false);

  // State for sentiment preference
  const [sentimentPreference, setSentimentPreference] = useState(false);
  const [isSentimentModified, setIsSentimentModified] = useState(false);

  // State for confirmation dialogs
  const [usernameChangeDialogOpen, setUsernameChangeDialogOpen] =
    useState(false);
  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
        setEditedUser(userData);
        if (userData.sentimentAnalysis)
          setSentimentPreference(userData.sentimentAnalysis);
      } catch (err:any) {
        console.error("Failed to fetch user data", err);
        if (err.response && err.response.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (user && editedUser) {
      const profileChanged =
        user.userName !== editedUser.userName ||
        user.email !== editedUser.email;
      setIsProfileModified(profileChanged);
    } else {
      setIsProfileModified(false);
    }
  }, [user, editedUser]);

  useEffect(() => {
    if (user) {
      setIsSentimentModified(user.sentimentAnalysis !== sentimentPreference);
    }
  }, [user, sentimentPreference]);

  const handleProfileEditToggle = () => {
    setProfileEditMode(!profileEditMode);
    if (profileEditMode) {
      setEditedUser(user);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    }
  };

  const handleProfileSave = async () => {
    if (editedUser && isProfileModified) {
      const usernameChanged = user?.userName !== editedUser.userName;

      if (usernameChanged) {
        setUsernameChangeDialogOpen(true);
      } else {
        await proceedWithSave();
      }
    }
  };

  const proceedWithSave = async () => {
    if (editedUser) {
      try {
        if (!user) return;
        await updateUser({
          ...user,
          userName: editedUser.userName,
          email: editedUser.email,
        });
        setUser(editedUser);
        setProfileEditMode(false);

        if (user?.userName !== editedUser.userName) {
          localStorage.removeItem("jwt");
          navigate("/login");
        }
      } catch (error) {
        console.error("Failed to update profile", error);
        setEditedUser(user);
      }
    }
  };

  const handleSentimentToggle = () => {
    setSentimentPreference(!sentimentPreference);
  };

  const handleSentimentSave = async () => {
    if (user && isSentimentModified) {
      try {
        await updateSentimentAnalysis(sentimentPreference);
        setUser({ ...user, sentimentAnalysis: sentimentPreference });
      } catch (error) {
        console.error("Failed to update sentiment preference", error);
        if (user.sentimentAnalysis)
          setSentimentPreference(user.sentimentAnalysis);
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser();
      localStorage.removeItem("jwt");
      navigate("/login");
    } catch (error) {
      console.error("Failed to delete account", error);
    }
  };

  if (!user) return <div>Loading user info...</div>;

  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 4, maxWidth: 600, margin: "auto" }}>
        <Grid container spacing={3} alignItems="center" sx={{ mb: 4 }}>
          <Grid>
            <Avatar sx={{ width: 80, height: 80 }}>
              <PersonIcon sx={{ fontSize: 60 }} />
            </Avatar>
          </Grid>
          <Grid>
            <Typography variant="h4">{user.userName}</Typography>
            <Typography variant="body1" color="textSecondary">
              {user.email}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Profile Editing Section */}
        <Box>
          <Typography variant="h6">Edit Profile</Typography>
          <TextField
            fullWidth
            label="Username"
            name="userName"
            value={editedUser?.userName || ""}
            onChange={handleProfileChange}
            disabled={!profileEditMode}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={editedUser?.email || ""}
            onChange={handleProfileChange}
            disabled={!profileEditMode}
            margin="normal"
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            {profileEditMode ? (
              <>
                <Button onClick={handleProfileEditToggle} sx={{ mr: 2 }}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleProfileSave}
                  disabled={!isProfileModified}
                >
                  Save Profile
                </Button>
              </>
            ) : (
              <Button variant="contained" onClick={handleProfileEditToggle}>
                Edit Profile
              </Button>
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Sentiment Analysis Preference Section */}
        <Box>
          <Typography variant="h6">Update Preferences</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={sentimentPreference}
                onChange={handleSentimentToggle}
              />
            }
            label="Sentiment Analysis Enabled"
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={handleSentimentSave}
              disabled={!isSentimentModified}
            >
              Save Preferences
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Delete Account Section */}
        <Box>
          <Typography variant="h6">Delete Account</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Once you delete your account, there is no going back. Please be
            certain.
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => setDeleteAccountDialogOpen(true)}
          >
            Delete Account
          </Button>
        </Box>
      </Paper>

      <ConfirmDialog
        open={usernameChangeDialogOpen}
        onClose={() => setUsernameChangeDialogOpen(false)}
        onConfirm={proceedWithSave}
        title="Confirm Username Change"
        message="Changing your username will log you out. Are you sure you want to proceed?"
      />

      <DeleteConfirmationDialog
        open={deleteAccountDialogOpen}
        onClose={() => setDeleteAccountDialogOpen(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account Confirmation"
        message="To confirm, type your username below."
        confirmationText={user.userName}
      />
    </Box>
  );
};

export default UserPage;
