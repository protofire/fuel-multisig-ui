import { Box, Typography } from "@mui/material";

import { APP_NAME } from "@/config/app";
import { StyledBox } from "@/sections/shared/BaseStepper/styled";

export function OwnersStep() {
  return (
    <Box>
      <Typography variant="h6" component="div" mt={1}>
        Set the owner wallets of your {APP_NAME} Account and how many need to
        confirm to execute a valid transaction.
      </Typography>
      <StyledBox
        mt={2}
        sx={{
          maxHeight: 300,
          overflowY: "auto",
        }}
        mb={5}
      ></StyledBox>
    </Box>
  );
}
