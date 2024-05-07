"use client";
import { Box } from "@mui/material";
import * as React from "react";

import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { WalletConnectionEvents } from "@/domain/events/WalletConnectionEvents";
import { useModalBehaviour } from "@/hooks/common/useModalBehaviour";
import { useRecentlyClicked } from "@/hooks/common/useRecentlyClicked";
import { useEventListenerCallback } from "@/hooks/useEventListenerCallback";
import { useGetBalance } from "@/hooks/useGetBalance";

import { AccountSelect } from "../AccountSelect";
import { ModalWallet } from "../ModalWalletProvider";
import { AddressFormatSwitch } from "./AddressFormatSwitch.tsx";
import { StyledConnectButton } from "./styled";

export const ConnectButton: React.FC = () => {
  const { ref: refButton, recentlyClicked } = useRecentlyClicked(500);
  const { openModal, isOpen, closeModal } = useModalBehaviour();
  const {
    accountConnected,
    connectWallet,
    isLoading,
    disconnectWallet,
    accounts,
    walletProviders,
    walletProviderConnected,
  } = useNetworkConnection();
  const { formatted, isLoading: isLoadingBalance } = useGetBalance();

  useEventListenerCallback(WalletConnectionEvents.onConnectWallet, () =>
    openModal()
  );

  if (accountConnected && walletProviderConnected)
    return (
      <Box display="flex">
        <AddressFormatSwitch />
        <AccountSelect
          accountConnected={accountConnected}
          accounts={accounts}
          disconnectWallet={disconnectWallet}
          balance={formatted}
          isLoading={isLoading}
          isLoadingBalance={isLoadingBalance}
          walletProvider={walletProviderConnected}
        />
      </Box>
    );

  return (
    <>
      <StyledConnectButton
        ref={refButton}
        isLoading={recentlyClicked || isLoading}
        onClick={openModal}
      >
        Connect
      </StyledConnectButton>
      <ModalWallet
        wallets={walletProviders}
        open={isOpen}
        handleClose={closeModal}
        connectWallet={connectWallet}
        onClose={closeModal}
      />
    </>
  );
};
