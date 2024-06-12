import { useQuery } from "@tanstack/react-query";
import { BigNumberish } from "fuels";

import { MultisigLocalManagmentEvents } from "@/domain/events/MultisigLocalManagmentEvents";
import { TransferDisplayInfo } from "@/domain/TransactionProposed";
import { useEventListenerCallback } from "@/hooks/useEventListenerCallback";
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

  const { data, isLoading, error, isError, refetch } = useQuery<
    TransferDisplayInfo[]
  >({
    queryKey: ["transactionQueue", transactionIds],
    queryFn: async () => {
      if (!contract || transactionIds.length === 0) return [];

      const data = await Promise.all(
        (transactionIds as BigNumberish[]).map(async (id) => {
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
    enabled: transactionIds !== undefined && !!contract,
    refetchInterval: 10000, // Refetch every 10 seconds
    initialData: [],
  });

  useEventListenerCallback(
    [
      MultisigLocalManagmentEvents.txApproved,
      MultisigLocalManagmentEvents.txRejected,
    ],
    () => refetch(),
    { delay: 2000 }
  );

  return {
    transactionData: data,
    error: error && getErrorMessage(error),
    isLoading: isLoading || isGettingIds,
  };
}
