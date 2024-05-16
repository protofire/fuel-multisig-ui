import { useQuery } from "@tanstack/react-query";
import { BN } from "fuels";

import { assetsMap } from "@/config/assetsMap";
import { AssetAmount } from "@/domain/ui/AssetAmount";
import { irregularToDecimalFormatted } from "@/utils/bnJsFormatter";

import { useGetMultisigContract } from "../multisigContract/useGetMultisigContract";

interface Props {
  contractId: string | undefined;
}

interface UseAssetsBalanceReturn {
  balances: AssetAmount[] | undefined;
  isLoading: boolean;
}

export function useAssetsBalance({
  contractId,
}: Props): UseAssetsBalanceReturn {
  const { contract } = useGetMultisigContract({ contractId });

  const { data, isLoading, isFetched } = useQuery({
    queryKey: ["useAssetsBalance", contract?.account?.address.toString()],
    queryFn: async () => {
      return Promise.all(
        Object.values(assetsMap).map(async (asset) => {
          const balance = await contract?.getBalance(asset.assetId);

          const formatted = irregularToDecimalFormatted(balance, {
            significantFigures: 4,
            assetInfo: asset,
          });

          return {
            ...asset,
            amount: balance || new BN(0),
            amountFormatted: formatted || "",
          };
        })
      );
    },
    enabled: !!contract,
    initialData: [],
  });

  return { balances: data, isLoading: !isFetched || isLoading };
}
