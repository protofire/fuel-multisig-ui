import { Box, Typography } from "@mui/material";

export function ReviewAsset() {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      gap={1}
      p={2}
    >
      <Typography>You need to select an asset previously.</Typography>
    </Box>
  );
}
