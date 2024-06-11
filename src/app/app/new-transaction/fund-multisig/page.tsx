"use client";

import { Box } from "@mui/material";

import { FromWalletAssetStepper } from "@/sections/NewTxView/FromWalletAssetStepper";

export default function TransferAssetPage() {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <FromWalletAssetStepper />
    </Box>
  );
}
