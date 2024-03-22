import { Box, Typography } from "@mui/material";

export default function SettingsPage() {
  return (
    <Box pt={4}>
      <Typography variant="h2">Settings</Typography>
    </Box>
  );
}

SettingsPage.connectedWalletRequired = false;
