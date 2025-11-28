import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import { JournalEntry } from "../../types";
import { useJournalEntries } from "../../context/JournalEntriesContext";
import { createJournalEntry, updateJournalEntry } from "../../api/api_calls";

const JournalEditor: React.FC = () => {
  const { state, dispatch } = useJournalEntries();
  const { currentEntry } = state;
  const [isNewEntry, setIsNewEntry] = useState<boolean>(true);

  useEffect(() => {
    setIsNewEntry(!currentEntry?.id);
  }, [currentEntry]);

  const handleChange = (field: keyof JournalEntry, value: string) => {
    dispatch({
      type: "SET_CURRENT_ENTRY",
      payload: { ...currentEntry, [field]: value } as JournalEntry,
    });
  };

  const handleSave = async () => {
    if (!currentEntry || !currentEntry.title) return;

    try {
      if (isNewEntry) {
        const newEntry = await createJournalEntry(currentEntry);
        dispatch({ type: "ADD_ENTRY", payload: newEntry });
      } else {
        if (!currentEntry.id) throw new Error("Invalid Id for Journal entry");
        const updatedEntry = await updateJournalEntry(
          currentEntry.id,
          currentEntry
        );
        dispatch({ type: "UPDATE_ENTRY", payload: updatedEntry });
      }
      dispatch({ type: "SET_CURRENT_ENTRY", payload: undefined });
    } catch (err) {
      console.error("Failed to save entry", err);
    }
  };

  return (
    <Paper sx={{ height: "80vh", p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {isNewEntry ? "New Entry" : "Edit Entry"}
      </Typography>
      <TextField
        fullWidth
        label="Title"
        margin="normal"
        value={currentEntry?.title || ""}
        onChange={(e) => handleChange("title", e.target.value)}
      />
      <TextField
        fullWidth
        label="Content"
        margin="normal"
        multiline
        rows={6}
        value={currentEntry?.content || ""}
        onChange={(e) => handleChange("content", e.target.value)}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleSave}>
          {isNewEntry ? "Add Entry" : "Update Entry"}
        </Button>
        {!isNewEntry && (
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() =>
              dispatch({ type: "SET_CURRENT_ENTRY", payload: undefined })
            }
          >
            Cancel Update
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default JournalEditor;
