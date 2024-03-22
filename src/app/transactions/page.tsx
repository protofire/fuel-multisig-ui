import { Box, Typography } from "@mui/material";

export default function TransactionsPage() {
  return (
    <Box pt={4}>
      <Typography variant="h2">Transactions</Typography>
    </Box>
  );
}

TransactionsPage.connectedWalletRequired = false;
