import { useQuery } from "@tanstack/react-query";
import { BigNumberish } from "fuels";
import { useCallback } from "react";

import { TransactionOutput } from "@/services/contracts/multisig/contracts/FuelMultisigAbi";
import {
  toTxQueueItem,
  TransactionDisplayInfo,
} from "@/services/contracts/transformers/toTxQueueItem";

import { useGetTxIdList } from "./useGetTxIdList";

export function useGetTransactionQueue() {
  const {
    data: transactionIds,
    contract,
    isLoading: isGettingIds,
  } = useGetTxIdList();

  const fetchTransactionData = useCallback(
    async (transactionIds: BigNumberish[]) => {
      if (!contract || transactionIds.length === 0) return [];

      return Promise.all(
        transactionIds.map(async (id) => {
          try {
            const [transaction, approvals, rejections] = await Promise.all([
              contract.functions.get_tx(id).dryRun(),
              contract.functions.get_tx_approval_count(id).dryRun(),
              contract.functions.get_tx_rejection_count(id).dryRun(),
            ]);
            return {
              id,
              transaction: transaction.value,
              approvals: approvals.value,
              rejections: rejections.value,
            };
          } catch (error) {
            console.error("Error fetching data for transaction ID", id, error);
            return null;
          }
        })
      );
    },
    [contract]
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ["transactionQueue", transactionIds],
    queryFn: () => fetchTransactionData(transactionIds as BigNumberish[]),
    enabled: !!transactionIds && !!contract,
    refetchInterval: 10000, // Refetch every 10 seconds
  });

  console.log("__dataGetTQueue", data);
  const transactionData: TransactionDisplayInfo[] = (data ?? [])
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .map((item) => ({
      ...toTxQueueItem(item.transaction as TransactionOutput),
      approvalCount: item.approvals,
      rejectionCount: item.rejections,
    }));

  return {
    transactionData,
    error: error,
    isLoading: isLoading || isGettingIds,
  };
}
