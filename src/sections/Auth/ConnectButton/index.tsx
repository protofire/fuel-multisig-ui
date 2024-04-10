"use client";
import * as React from "react";

import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { useModalBehaviour } from "@/hooks/common/useModalBehaviour";
import { useRecentlyClicked } from "@/hooks/common/useRecentlyClicked";
import { useGetBalance } from "@/hooks/useGetBalance";

import { AccountSelect } from "../AccountSelect";
import { ModalWallet } from "../ModalWalletProvider";
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

  // console.log("__acccountConnected", accountConnected, walletProviderConnected);
  if (accountConnected && walletProviderConnected)
    return (
      <AccountSelect
        accountConnected={accountConnected}
        accounts={accounts}
        disconnectWallet={disconnectWallet}
        balance={formatted}
        isLoading={isLoading}
        isLoadingBalance={isLoadingBalance}
        walletProvider={walletProviderConnected}
      />
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
