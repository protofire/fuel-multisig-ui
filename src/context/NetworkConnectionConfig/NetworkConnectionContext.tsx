"use client";
import {
  useAccount,
  useAccounts,
  useConnectUI,
  useDisconnect,
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

import {
  AccountWalletItem,
  toAccountSelect,
} from "@/domain/ui/AccountSelectItem";

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
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
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
  const { wallet, isLoading } = useWallet();
  const { isConnected } = useIsConnected();
  const { account } = useAccount();
  const { accounts } = useAccounts();
  const { disconnect } = useDisconnect();
  const { connect, isConnecting, isError: errorConnecting } = useConnectUI();
  const _accounts = useMemo(() => {
    if (!accounts || !wallet) return [];

    const connectorName =
      (wallet?.connector as FuelConnectorExtended)._currentConnector?.name ??
      "";

    return accounts.map((address, index) =>
      toAccountSelect(
        address as `fuel${string}`,
        connectorName,
        `Acct. ${index + 1}`
      )
    );
  }, [accounts, wallet]);

  useEffect(() => {
    if (!errorConnecting) return;

    setError("ACCOUNTS_NOT_FOUND");
    alert(
      "Error trying to connect the wallet, check that you have internet connection and at least one account created."
    );
  }, [errorConnecting]);

  const connectWallet = useCallback(async () => {
    try {
      connect();
    } catch (err) {
      console.log("error connecting: ", err);
      setError("FAILED_TO_CONNECT");
    }
  }, [connect]);

  const disconnectWallet = async () => {
    if (!isConnected) return;

    disconnect();
  };

  return (
    <NetworkConnectionContext.Provider
      value={{
        wallet,
        accounts: _accounts,
        accountConnected: account || undefined,
        isLoading: isLoading || isConnecting,
        error,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </NetworkConnectionContext.Provider>
  );
};
