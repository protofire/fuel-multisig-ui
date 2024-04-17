import { Grid } from "@mui/material";

import { SummaryCardsView } from "@/sections/SummaryCardsView";

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
        {/* TODO */}
        {/* <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h3" color="primary">
            Transaction queue
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <p> Table </p>
        </Grid> */}
      </Grid>
    </>
  );
}

AppDashboardPage.connectedWalletRequired = false;
