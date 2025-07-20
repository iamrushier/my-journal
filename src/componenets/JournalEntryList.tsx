import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useJournalEntries } from "../../context/JournalEntriesContext";
import { getUserJournalEntries, deleteJournalEntry } from "../../api/api_calls";

const JournalEntryList: React.FC = () => {
  const { state, dispatch } = useJournalEntries();
  const { entriesList } = state;

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await getUserJournalEntries();
        dispatch({ type: "SET_ENTRIES", payload: data });
      } catch (error) {
        console.error("Failed to fetch journal entries", error);
      }
    };
    fetchEntries();
  }, [dispatch]);

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await deleteJournalEntry(id);
      dispatch({ type: "DELETE_ENTRY", payload: id });
      dispatch({ type: "SET_CURRENT_ENTRY", payload: undefined });
    } catch (err) {
      console.error("Failed to delete entry", err);
    }
  };

  return (
    <Paper sx={{ height: "80vh", overflowY: "auto", p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Entries
      </Typography>
      <List>
        {entriesList.map((entry) => (
          <ListItem
            key={entry.id}
            button
            onClick={() => dispatch({ type: "SET_CURRENT_ENTRY", payload: entry })}
            secondaryAction={
              <IconButton
                edge="end"
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(entry.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={entry.title || "Untitled"} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default JournalEntryList;
