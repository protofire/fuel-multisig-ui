import { Box } from "@mui/material";

import { ChangeThresholdStepper } from "@/sections/SettingsView/RequiredConfirmations/ChangeThresholdStepper";

export default function ThresholdPage() {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <ChangeThresholdStepper />
    </Box>
  );
}
