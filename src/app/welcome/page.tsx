import { Box } from "@mui/material";

import { Footer } from "@/sections/layout/Footer";
import { WelcomeCard } from "@/sections/WelcomeView/WelcomeCard";

export default function WelcomePage() {
  return (
    <Box>
      <WelcomeCard />
      <Footer />
    </Box>
  );
}

WelcomePage.connectedWalletRequired = false;
