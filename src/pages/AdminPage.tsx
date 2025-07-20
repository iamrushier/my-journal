import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUserByUsername } from "../../api/api_calls";
import { User } from "../../types";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";

const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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

    fetchUsers();
  }, []);

  const handleDelete = async (username: string) => {
    try {
      await deleteUserByUsername(username);
      setUsers(users.filter((u) => u.userName !== username));
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {users.length === 0 ? (
        <Typography>No users found.</Typography>
      ) : (
        users.map((user) => (
          <Card key={user.userName} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{user.userName}</Typography>
              <Typography variant="body2">
                Roles: {user.roles?.join(", ")}
              </Typography>
              <Button
                color="error"
                onClick={() => handleDelete(user.userName)}
                sx={{ mt: 1 }}
              >
                Delete User
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default AdminPage;
