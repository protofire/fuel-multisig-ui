import { Grid, Link, Typography } from "@mui/material";
import { assets } from "fuels";

import { ROUTES } from "@/config/routes";
import { SummaryCard } from "@/sections/common/SummaryCard";

export default function AppDashboardPage() {
  return (
    <>
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            captionTitle="Balance"
            widthSkeleton="60%"
            captionComponent="1 ETH"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            captionTitle="Tracked Tokens"
            caption={`${assets.length}`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard captionTitle="Confirmations required" caption="1" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Link href={ROUTES.Settings}>
            <SummaryCard captionTitle="Owners" caption="3" />
          </Link>
        </Grid>
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
          <p> Table </p>
        </Grid>
      </Grid>
    </>
  );
}

AppDashboardPage.connectedWalletRequired = false;
