import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import JournalEntryList from "../componenets/JournalEntryList";
import JournalEditor from "../componenets/JournalEditor";
import { getUserGreeting } from "../../api/api_calls";

const DashboardPage = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const response = await getUserGreeting();
        setGreeting(response);
      } catch (error) {
        console.error("Failed to fetch greeting", error);
      }
    };

    fetchGreeting();
  }, []);

  return (
    <Box sx={{ p: 4, height: "100%" }}>
      <Typography variant="h4" gutterBottom>
        {greeting}
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <JournalEntryList />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <JournalEditor />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
