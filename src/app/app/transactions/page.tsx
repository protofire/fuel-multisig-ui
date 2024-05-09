import { Box, Typography } from "@mui/material";

import { TxTable } from "@/sections/TransactionsView/TxTable";

export default function TransactionsPage() {
  return (
    <Box pt={4}>
      <Typography variant="h3" color="primary">
        Transactions
      </Typography>
      <TxTable />
    </Box>
  );
}
