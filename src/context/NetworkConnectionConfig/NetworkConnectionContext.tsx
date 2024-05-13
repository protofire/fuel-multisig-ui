"use client";

import {
  useAccount,
  useAccounts,
  useChain,
  useConnect,
  useDisconnect,
  useFuel,
  useIsConnected,
  useWallet,
} from "@fuels/react";
import { Account, FuelConnector } from "fuels";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ChainInfo } from "@/domain/ChainInfo";
import { WalletConnectionEvents } from "@/domain/events/WalletConnectionEvents";
import { AccountWalletItem } from "@/domain/ui/AccountSelectItem";
import { WalletProviderItem } from "@/domain/ui/WalletProviderItem";
import { useSaveMultisignatureSelected } from "@/hooks/multisignatureSelected/useSaveMultisignatureSelected";
import {
  toAccountWalletItem,
  toWalletProvider,
} from "@/services/fuel/connectors/transformer";
import { getErrorMessage } from "@/utils/error";

type NetworkConnectionError =
  | "FAILED_TO_CONNECT"
  | "WALLET_NOT_DETECTED"
  | "ACCOUNTS_NOT_FOUND";

export type WalletType = Account;

export interface NetworkConnectionContextType {
  isLoading: boolean;
  accounts: AccountWalletItem[];
  error: NetworkConnectionError | undefined;
  accountConnected: string | undefined;
  wallet: WalletType | undefined | null; // null when is loaded and to connected
  walletProviders: WalletProviderItem[];
  walletProviderConnected: WalletProviderItem | undefined;
  chainInfo: ChainInfo | undefined;
  connectWallet: (connectorName: FuelConnector["name"]) => Promise<void>;
  disconnectWallet: () => void;
  setAccount?: (account: AccountWalletItem) => void;
}

export const NetworkConnectionContext = createContext<
  NetworkConnectionContextType | undefined
>(undefined);

interface NetworkConnectionProviderProps {
  children: ReactNode;
}

export const NetworkConnectionProvider: React.FC<
  NetworkConnectionProviderProps
> = ({ children }) => {
  const [error, setError] = useState<NetworkConnectionContextType["error"]>();
  const [walletProviders, setWalletProviders] = useState<WalletProviderItem[]>(
    []
  );
  const { wallet, isLoading: isLoadingWallet } = useWallet();
  const { isConnected } = useIsConnected();
  const { account } = useAccount();
  const { accounts } = useAccounts();
  const { fuel } = useFuel();
  const { connect, error: errorConnecting, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { chain: chainData } = useChain();
  const [chainInfo, setChainInfo] = useState<ChainInfo | undefined>();
  const [walletProviderConnected, setWalletProviderConnected] = useState<
    WalletProviderItem | undefined
  >();
  const { save } = useSaveMultisignatureSelected();

  useEffect(() => {
    if (!chainData) return;

    setChainInfo({
      name: chainData.name,
      chainId: chainData.consensusParameters.chainId.toNumber(),
    });
  }, [chainData]);

  const _accounts = useMemo(() => {
    if (!accounts) return [];

    return accounts.map((address, index) =>
      toAccountWalletItem(address as `fuel${string}`, `Acct. ${index + 1}`)
    );
  }, [accounts]);

  useEffect(() => {
    if (!isConnected) return;

    const connector = fuel.currentConnector();
    connector && setWalletProviderConnected(toWalletProvider(connector));
  }, [fuel, isConnected]);

  useEffect(() => {
    if (!fuel) return;

    fuel
      .connectors()
      .then((values) =>
        setWalletProviders(values.map((c) => toWalletProvider(c)))
      );
  }, [fuel]);

  const connectWallet = useCallback(
    async (connectorName: string | null | undefined) => {
      try {
        connect(connectorName);
      } catch (err) {
        const msg = getErrorMessage(err);
        console.error("error connecting: ", msg);
        setError("FAILED_TO_CONNECT");
      }
    },
    [connect]
  );

  const disconnectWallet = async () => {
    if (!isConnected) return;
    setWalletProviderConnected(undefined);
    save("");
    document.dispatchEvent(new CustomEvent(WalletConnectionEvents.disconnect));

    disconnect();
  };

  return (
    <NetworkConnectionContext.Provider
      value={{
        walletProviderConnected,
        walletProviders,
        wallet,
        accounts: _accounts,
        accountConnected: account || undefined,
        isLoading: isLoadingWallet || isPending,
        error,
        chainInfo,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </NetworkConnectionContext.Provider>
  );
};
