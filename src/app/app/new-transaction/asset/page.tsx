"use client";

import { Box } from "@mui/material";

import { TransferAssetStepper } from "@/sections/NewTxView/TransferAssetStepper";

export default function TransferAssetPage() {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <TransferAssetStepper />
    </Box>
  );
}
