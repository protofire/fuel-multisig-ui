import { useAssets, useBalance } from "@fuel-wallet/react";
import { CoinQuantity } from "fuels";
import { useEffect, useState } from "react";

import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";

import { useBalanceMultisignatureSelected } from "./useBalanceMultisignatureSelected";
import { useMultisignatureAccountSelected } from "./useMultisignatureAccountSelected";

export function useAssetsBalance() {
  const { accountConnected, isLoading, wallet } = useNetworkConnection();
  const { assets } = useAssets();
  console.log("__assets", assets);
  const { balance: ethBalance, isFetching: isFetchingEth } =
    useBalanceMultisignatureSelected();
  const { balance } = useBalance({ address: accountConnected });
  const { multisigSelected } = useMultisignatureAccountSelected();
  const [balances, setBalances] = useState<CoinQuantity[]>();

  useEffect(() => {
    if (!multisigSelected?.address) return;

    const getBalances = async () =>
      await wallet?.provider.getBalances(multisigSelected?.address);

    getBalances().then((balances) => setBalances(balances));
  }, [multisigSelected?.address, wallet?.provider]);

  return { balance, balances };
}
