import React from "react";
import { Box, Grid } from "@mui/material";
import JournalEntryList from "../componenets/JournalEntryList";
import JournalEditor from "../componenets/JournalEditor";

const DashboardPage = () => {
  return (
    <Box sx={{ p: 4, height: "100%" }}>
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
