"use client";

import { Grid } from "@mui/material";

import { useEthMultisignatureSelected } from "@/hooks/multisignatureSelected/useEthMultisignatureSelected";
import { useMultisignatureAccountSelected } from "@/hooks/multisignatureSelected/useMultisignatureAccountSelected";
import { SummaryCard } from "@/sections/common/SummaryCard";

export function SummaryCardsView() {
  const { balance, isFetching } = useEthMultisignatureSelected();
  const { multisigSelected } = useMultisignatureAccountSelected();

  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          captionTitle="Balance"
          widthSkeleton="60%"
          caption={balance}
          isLoading={isFetching}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          captionTitle="Tracked Tokens"
          caption="-"
          widthSkeleton="60%"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          captionTitle="Confirmations required"
          caption={multisigSelected?.threshold.toString()}
          widthSkeleton="60%"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          captionTitle="Owners"
          caption={multisigSelected?.owners.length.toString()}
          widthSkeleton="60%"
        />
      </Grid>
    </>
  );
}
