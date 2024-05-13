import { Box, Typography } from "@mui/material";

import { TxBuilderStepper } from "@/sections/TxBuilderView/TxBuilderStepper";

export default function TransactionsBuilderPage() {
  return (
    <Box pt={4}>
      <Typography variant="h3" color="primary">
        Transaction builder
      </Typography>

      <TxBuilderStepper />
    </Box>
  );
}
