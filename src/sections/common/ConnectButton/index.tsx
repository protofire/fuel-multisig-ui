"use client";
import * as React from "react";

import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { useGetBalance } from "@/hooks/useGetBalance";
import { useRecentlyClicked } from "@/hooks/useRecentlyClicked";

import { AccountSelect } from "../AccountSelect";
import { StyledConnectButton } from "./styled";

export const ConnectButton: React.FC = () => {
  const { ref: refButton, recentlyClicked } = useRecentlyClicked(500);
  const {
    accountConnected,
    connectWallet,
    isLoading,
    disconnectWallet,
    accounts,
  } = useNetworkConnection();
  const { formatted, isLoading: isLoadingBalance } = useGetBalance();

  if (accountConnected)
    return (
      <AccountSelect
        accountConnected={accountConnected}
        accounts={accounts}
        disconnectWallet={disconnectWallet}
        balance={formatted}
      />
    );

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
