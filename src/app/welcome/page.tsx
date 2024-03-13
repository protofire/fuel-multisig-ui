import { Box } from "@mui/material";

import { WelcomeCard } from "@/sections/WelcomeView/WelcomeCard";

export default function WelcomePage() {
  return (
    <Box>
      <WelcomeCard />
    </Box>
  );
}

WelcomePage.connectedWalletRequired = false;
