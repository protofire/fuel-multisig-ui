import { Grid, Typography } from "@mui/material";

import { SummaryCardsView } from "@/sections/SummaryCardsView";
import { TxQueueWidget } from "@/sections/TxQueueWidget";

export default function AppDashboardPage() {
  return (
    <>
      <Grid container spacing={3} mt={2}>
        <SummaryCardsView />
      </Grid>
      <Grid
        container
        spacing={3}
        sx={{
          marginTop: "1rem",
        }}
      >
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h3" color="primary">
            Transaction queue
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TxQueueWidget />
        </Grid>
      </Grid>
    </>
  );
}

AppDashboardPage.connectedWalletRequired = false;
