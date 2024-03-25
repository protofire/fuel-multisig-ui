"use client";

import { Grid } from "@mui/material";

import { SummaryCard } from "@/sections/common/SummaryCard";

export function SummaryCardsView() {
  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          captionTitle="Balance"
          widthSkeleton="60%"
          caption="1 ETH"
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          captionTitle="Tracked Tokens"
          caption="2"
          widthSkeleton="60%"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          captionTitle="Confirmations required"
          caption="1"
          widthSkeleton="60%"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard captionTitle="Owners" caption="3" widthSkeleton="60%" />
      </Grid>
    </>
  );
}
