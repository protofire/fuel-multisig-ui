import {
  useAccount,
  useConnectUI,
  useDisconnect,
  useIsConnected,
  useWallet,
} from "@fuel-wallet/react";
import { FuelWalletLocked } from "@fuel-wallet/sdk";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

type NetworkConnectionError =
  | "FAILED_TO_CONNECT"
  | "WALLET_NOT_DETECTED"
  | "ACCOUNTS_NOT_FOUND";

interface NetworkConnectionContextType {
  isLoading: boolean;
  accounts: string[];
  error: NetworkConnectionError | undefined;
  accountConnected: string | undefined;
  wallet: FuelWalletLocked | undefined | null; // null when is loaded and to connected
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
  const [accounts, setAccounts] = useState<
    NetworkConnectionContextType["accounts"]
  >([]);
  const { wallet, isLoading } = useWallet();
  const { isConnected } = useIsConnected();
  const { account } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, isConnecting, isError: errorConnecting } = useConnectUI();

  useEffect(() => {
    if (!errorConnecting) return;

    setError("FAILED_TO_CONNECT");
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
    setAccounts([]);
  };

  return (
    <NetworkConnectionContext.Provider
      value={{
        wallet,
        accounts,
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
