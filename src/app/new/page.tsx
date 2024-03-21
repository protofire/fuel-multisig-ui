"use client";

import { Box, Typography } from "@mui/material";

import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { FallbackSpinner } from "@/sections/common/FallbackSpinner";

export default function NewAccountPage() {
  const { accountConnected, chainInfo } = useNetworkConnection();

  if (!chainInfo || !accountConnected) return <FallbackSpinner />;

  return (
    <Box>
      <Typography>Newwwwwwwwwwwwwwwww Accout</Typography>
      <Typography>Newwwwwwwwwwwwwwwww Accout</Typography>
      <Typography>Newwwwwwwwwwwwwwwww Accout</Typography>
      <Typography>Newwwwwwwwwwwwwwwww Accout</Typography>
      <Typography>Newwwwwwwwwwwwwwwww Accout</Typography>
      <Typography>Newwwwwwwwwwwwwwwww Accout</Typography>
      <Typography>Newwwwwwwwwwwwwwwww Accout</Typography>
    </Box>
  );
}

NewAccountPage.connectedWalletRequired = false;
