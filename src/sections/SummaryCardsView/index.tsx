"use client";

import { Grid } from "@mui/material";
import { useMemo } from "react";

import { useAssetsBalance } from "@/hooks/multisignatureSelected/useAssetsBalance";
import { useMultisignatureAccountSelected } from "@/hooks/multisignatureSelected/useMultisignatureAccountSelected";
import { useAssetsInfoFinder } from "@/hooks/useGetBalance";
import { SummaryCard } from "@/sections/shared/common/SummaryCard";

export function SummaryCardsView() {
  const { multisigSelected } = useMultisignatureAccountSelected();
  const { baseAssetId } = useAssetsInfoFinder();
  const { balances, isLoading } = useAssetsBalance({
    contractId: multisigSelected?.address,
  });

  const ethBalance = useMemo(
    () =>
      balances?.find((assetBalance) => assetBalance.assetId === baseAssetId),
    [balances, baseAssetId]
  );

  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          captionTitle="Balance"
          widthSkeleton="60%"
          caption={ethBalance?.amountFormatted}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          captionTitle="Tracked Tokens"
          caption={
            balances?.filter((a) => a.amount.gt(0)).length.toString() || "0"
          }
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
