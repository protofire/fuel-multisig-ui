import { Box, Typography } from "@mui/material";

import { AssetsTable } from "@/sections/AssetsView/AssetsTable";

export default function AssetsPage() {
  return (
    <Box pt={4}>
      <Typography variant="h2">Assets</Typography>
      <AssetsTable />
    </Box>
  );
}

AssetsPage.connectedWalletRequired = false;
