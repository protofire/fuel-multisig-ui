"use client";
import {
  useAccount,
  useAccounts,
  useConnect,
  useDisconnect,
  useFuel,
  useIsConnected,
  useWallet,
} from "@fuel-wallet/react";
import { FuelConnector, FuelWalletLocked } from "@fuel-wallet/sdk";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { AccountWalletItem } from "@/domain/ui/AccountSelectItem";
import { WalletProviderItem } from "@/domain/ui/WalletProviderItem";
import {
  toAccountSelect,
  toWalletProvider,
} from "@/services/fuel/connectors/transformer";

type NetworkConnectionError =
  | "FAILED_TO_CONNECT"
  | "WALLET_NOT_DETECTED"
  | "ACCOUNTS_NOT_FOUND";

export type WalletType = FuelWalletLocked;
type FuelConnectorExtended = {
  _currentConnector?: {
    name: FuelConnector["name"];
  };
};

export interface NetworkConnectionContextType {
  isLoading: boolean;
  accounts: AccountWalletItem[];
  error: NetworkConnectionError | undefined;
  accountConnected: string | undefined;
  wallet: WalletType | undefined | null; // null when is loaded and to connected
  walletProviders: WalletProviderItem[];
  walletProviderConnected: WalletProviderItem | undefined;
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
  const {
    connect,
    isLoading: isConnecting,
    error: errorConnecting,
  } = useConnect();
  const { disconnect } = useDisconnect();
  const [walletProviderConnected, setWalletProviderConnected] = useState<
    WalletProviderItem | undefined
  >();

  const _accounts = useMemo(() => {
    if (!accounts || !wallet) return [];

    return accounts.map((address, index) =>
      toAccountSelect(address as `fuel${string}`, `Acct. ${index + 1}`)
    );
  }, [accounts, wallet]);

  useEffect(() => {
    setWalletProviderConnected(undefined);

    if (isConnected) {
      const connector = fuel.currentConnector();
      connector && setWalletProviderConnected(toWalletProvider(connector));
    }
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
        console.log("error connecting: ", err);
        setError("FAILED_TO_CONNECT");
      }
    },
    [connect]
  );

  const disconnectWallet = async () => {
    if (!isConnected) return;

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
        isLoading: isLoadingWallet || isConnecting,
        error,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </NetworkConnectionContext.Provider>
  );
};
