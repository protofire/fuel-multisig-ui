import { useQuery } from "@tanstack/react-query";
import { BigNumberish } from "fuels";
import { useCallback } from "react";

import { TransferDisplayInfo } from "@/domain/TransactionProposed";
import { useAssetsInfoFinder } from "@/hooks/useGetBalance";
import { toTransactionDisplayInfo } from "@/services/contracts/transformers/toTransactionDisplayInfo";
import { getErrorMessage } from "@/utils/error";

import { useGetTxIdList } from "./useGetTxIdList";

export function useGetTransactionQueue() {
  const {
    data: transactionIds,
    contract,
    isLoading: isGettingIds,
    multisigSelected,
  } = useGetTxIdList();
  const { assetInfoFinder } = useAssetsInfoFinder();

  const fetchTransactionData = useCallback(
    async (transactionIds: BigNumberish[]) => {
      if (!contract || transactionIds.length === 0) return [];

      return Promise.all(
        transactionIds.map(async (id) => {
          try {
            const transaction = await contract.functions.get_tx(id).dryRun();

            return transaction.value;
          } catch (error) {
            console.error(
              "Error fetching data for transaction ID",
              id.toString(),
              error
            );
            return null;
          }
        })
      );
    },
    [contract]
  );

  const { data, isLoading, error, isError } = useQuery<TransferDisplayInfo[]>({
    queryKey: ["transactionQueue", transactionIds],
    queryFn: async () => {
      const data = await fetchTransactionData(transactionIds as BigNumberish[]);
      return (data ?? [])
        .filter((tx): tx is NonNullable<typeof tx> => tx !== null)
        .map((tx) => {
          return {
            ...toTransactionDisplayInfo(
              tx,
              multisigSelected?.threshold || 1,
              multisigSelected,
              assetInfoFinder
            ),
          };
        });
    },
    enabled: !!transactionIds && !!contract,
    refetchInterval: 10000, // Refetch every 10 seconds
    initialData: [],
  });

  return {
    transactionData: data,
    error: error && getErrorMessage(error),
    isLoading: isLoading || isGettingIds,
  };
}
