import { Box, Typography } from "@mui/material";

import { SetUpMultisigStepper } from "@/sections/SettingsView/SetUpMultisigStepper";

export default function SettingsPage() {
  return (
    <Box pt={4}>
      <Typography variant="h3" color="primary">
        Settings
      </Typography>

      <SetUpMultisigStepper />
    </Box>
  );
}
