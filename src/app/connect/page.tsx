"use client";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

import { ROUTES } from "@/config/routes";
import { WalletConnectionEvents } from "@/domain/events/WalletConnectionEvents";
import { useRedirectComparison } from "@/hooks/common/useRedirectComparison";
import { MainContentCard } from "@/sections/shared/MainContentCard";

export default function ConnectWalletPage() {
  const [instructions, setInstructions] = useState<string | undefined>();
  const theme = useTheme();

  useRedirectComparison({
    redirectUrls: [ROUTES.New],
    onMatch: (route) =>
      setInstructions(
        route === ROUTES.New
          ? "To create a new account"
          : "To interact with the app."
      ),
  });

  const disptachConnect = () => {
    document.dispatchEvent(
      new CustomEvent(WalletConnectionEvents.onConnectWallet)
    );
  };

  return (
    <MainContentCard
      stylesContainer={{
        alignItems: "center",
        sx: {
          backgroundColor: theme.palette.background.paper,
          padding: "2rem 1rem",
        },
      }}
      title="Connect your Wallet"
      paragraph="To continue with the following actions you need to connect your wallet."
    >
      {instructions && (
        <Typography variant="body1">
          {instructions}, you will need a wallet to sign the transaction.
        </Typography>
      )}
      <Button variant="contained" onClick={disptachConnect}>
        <AccountBalanceWalletIcon />
        Connect your wallet
      </Button>
    </MainContentCard>
  );
}
