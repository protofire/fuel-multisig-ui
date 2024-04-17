import { CoinQuantity } from "fuels";
import { useCallback, useEffect, useState } from "react";

import { assetByContractId } from "@/config/assetsMap";
import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { AssetAmount } from "@/domain/ui/AssetAmount";
import { irregularToDecimalFormatted } from "@/utils/bnJsFormatter";

import { useMultisignatureAccountSelected } from "./useMultisignatureAccountSelected";

interface UseAssetsBalanceReturn {
  balances: AssetAmount[] | undefined;
  isLoading: boolean;
}

export function useAssetsBalance(): UseAssetsBalanceReturn {
  const [isLoading, setIsLoading] = useState(true);
  const { wallet } = useNetworkConnection();
  const { multisigSelected } = useMultisignatureAccountSelected();
  const [balances, setBalances] = useState<AssetAmount[]>();

  const _setCoinsBalances = useCallback(
    (coinsBalance: CoinQuantity[] | undefined) => {
      if (!coinsBalance?.length) return;

      const _balances = coinsBalance.map((coinQuantity): AssetAmount => {
        const assetInfo = assetByContractId(coinQuantity.assetId);

        const formatted = irregularToDecimalFormatted(coinQuantity.amount, {
          significantFigures: 4,
          assetInfo,
        });

        return {
          ...assetInfo,
          amountFormatted: formatted || "-",
          amount: coinQuantity.amount,
        };
      }, []);

      setBalances(_balances);
    },
    []
  );

  useEffect(() => {
    if (!multisigSelected?.address) return;

    setIsLoading(true);
    const _getBalances = async () =>
      await wallet?.provider.getBalances(multisigSelected.address);

    _getBalances()
      .then(_setCoinsBalances)
      .finally(() => setIsLoading(false));
  }, [_setCoinsBalances, multisigSelected?.address, wallet?.provider]);

  return { balances, isLoading };
}
