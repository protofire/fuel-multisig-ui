import { Box } from "@mui/material";

import { AddOwnerStepper } from "@/sections/SettingsView/ManageOwners/AddOwnerStepper";

export default function OwnersPage() {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <AddOwnerStepper />
    </Box>
  );
}
