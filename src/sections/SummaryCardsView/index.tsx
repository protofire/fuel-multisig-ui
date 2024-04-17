"use client";

import { Grid } from "@mui/material";

import { useAssetsBalance } from "@/hooks/multisignatureSelected/useAssetsBalance";
import { useEthMultisignatureSelected } from "@/hooks/multisignatureSelected/useEthMultisignatureSelected";
import { useMultisignatureAccountSelected } from "@/hooks/multisignatureSelected/useMultisignatureAccountSelected";
import { SummaryCard } from "@/sections/common/SummaryCard";

export function SummaryCardsView() {
  const { balance, isFetching } = useEthMultisignatureSelected();
  const { multisigSelected } = useMultisignatureAccountSelected();
  const { balances } = useAssetsBalance();

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
          caption={balances?.length.toString() || "0"}
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
