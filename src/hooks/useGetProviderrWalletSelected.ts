import { useMemo } from "react";

import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { AccountWalletItem } from "@/domain/ui/AccountSelectItem";

interface UseAccountWalletItemReturn {
  accountWalletItem: AccountWalletItem | undefined;
}
export function useAccountWalletItem(): UseAccountWalletItemReturn {
  const { accountConnected, accounts } = useNetworkConnection();

  const accountWalletItem = useMemo(() => {
    return accounts.find((a) => a.address.bech32 === accountConnected);
  }, [accounts, accountConnected]);

  return { accountWalletItem };
}
