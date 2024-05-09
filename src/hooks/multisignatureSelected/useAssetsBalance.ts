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
      if (!coinsBalance?.length) {
        setBalances([]);
        return;
      }

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
    const _getBalances = async () => {
      const _balances = await wallet?.provider.getBalances(
        multisigSelected.address
      );
      _setCoinsBalances(_balances);
    };

    // Call immediately at the first time
    _getBalances().finally(() => setIsLoading(false));

    const intervalId = setInterval(() => {
      _getBalances().finally(() => setIsLoading(false));
    }, 10000);

    return () => clearInterval(intervalId);
  }, [_setCoinsBalances, multisigSelected?.address, wallet?.provider]);

  return { balances, isLoading };
}
