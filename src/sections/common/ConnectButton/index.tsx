"use client";
import * as React from "react";

import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { useRecentlyClicked } from "@/hooks/useRecentlyClicked";

import { StyledConnectButton } from "./styled";

export const ConnectButton: React.FC = () => {
  const { ref: refButton, recentlyClicked } = useRecentlyClicked(500);
  const { accountConnected, connectWallet, isLoading, disconnectWallet } =
    useNetworkConnection();

  if (accountConnected) return <>{accountConnected}</>;

  return (
    <>
      <StyledConnectButton
        ref={refButton}
        isLoading={recentlyClicked || isLoading}
        onClick={connectWallet}
      >
        Connect
      </StyledConnectButton>
    </>
  );
};
