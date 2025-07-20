import React, { useEffect, useState } from "react";
import {
  getUserJournalEntries,
  createJournalEntry,
  deleteJournalEntry,
} from "../../api/api_calls";
import { JournalEntry } from "../../types";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import Header from "../componenets/Header";

const DashboardPage = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const data = await getUserJournalEntries();
      setEntries(data);
    } catch (error) {
      console.error("Failed to fetch journal entries", error);
    }
  };

  const handleCreate = async () => {
    if (!title.trim()) return;

    const newEntry: JournalEntry = {
      title,
      content,
    };

    try {
      await createJournalEntry(newEntry);
      setTitle("");
      setContent("");
      fetchEntries(); // Refresh list
    } catch (err) {
      console.error("Failed to create entry", err);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await deleteJournalEntry(id);
      fetchEntries();
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Journal
      </Typography>

      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          New Entry
        </Typography>
        <TextField
          fullWidth
          label="Title"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          label="Content"
          margin="normal"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleCreate}
        >
          Add Entry
        </Button>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Previous Entries
      </Typography>
      {entries.length === 0 && <Typography>No entries found.</Typography>}
      {entries.map((entry) => (
        <Paper key={entry.id} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {entry.title}
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
            {entry.content}
          </Typography>
          <Button
            size="small"
            color="error"
            sx={{ mt: 1 }}
            onClick={() => handleDelete(entry.id)}
          >
            Delete
          </Button>
        </Paper>
      ))}
    </Box>
  );
};

export default DashboardPage;
