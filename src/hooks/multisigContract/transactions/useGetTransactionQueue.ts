import { useQuery } from "@tanstack/react-query";
import { BigNumberish } from "fuels";
import { useCallback, useState } from "react";

import {
  toTxQueueItem,
  TransactionDisplayInfo,
} from "@/services/contracts/transformers/toTxQueueItem";
import { getErrorMessage } from "@/utils/error";

import { useGetTxIdList } from "./useGetTxIdList";

export function useGetTransactionQueue() {
  // const [error, setError] = useState<string | undefined>();
  // const [isLoading, setIsLoading] = useState(true);
  // const { data, contract, isLoading: isGettingIds } = useGetTxIdList();
  // const [transactionData, setTransactionData] = useState<
  //   TransactionDisplayInfo[] | undefined
  // >();

  // const getTransactionQueue = useCallback(
  //   async (transactionIds: BigNumberish[]) => {
  //     setError(undefined);
  //     setIsLoading(true);
  //     try {
  //       const transactionsOuput = await Promise.all(
  //         transactionIds.map(async (_id) => {
  //           return contract?.functions.get_tx(_id).dryRun();
  //         })
  //       );

  //       const _filtered = transactionsOuput
  //         .map((t) => t?.value)
  //         .filter((t): t is TransactionOutput => t !== undefined);

  //       setTransactionData(_filtered.map((i) => toTxQueueItem(i)));

  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     } catch (e: any) {
  //       const msg = getErrorMessage(e);
  //       let defaultMsg =
  //         "An error has ocurred while trying to fetch transaction ids";

  //       if (e.cause && Array.isArray(e.cause.logs) && e.cause.logs.length) {
  //         defaultMsg = e.cause.logs[0];
  //       }

  //       console.error(defaultMsg, msg);
  //       setError(`${msg}: ${defaultMsg}`);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   },
  //   [contract?.functions]
  // );

  // useEffect(() => {
  //   if (!data) return;

  //   getTransactionQueue(data);
  // }, [getTransactionQueue, data]);

  // return {
  //   getTransactionQueue,
  //   error,
  //   isLoading: isGettingIds || isLoading,
  //   transactionData,
  // };

  const {
    data: transactionIds,
    contract,
    isLoading: isGettingIds,
  } = useGetTxIdList();
  const [_error, _setError] = useState<string | undefined>();

  const fetchTransactionData = useCallback(
    async (transactionIds: BigNumberish[]) => {
      if (!contract) return [];

      const promises = transactionIds.map(async (id) => {
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
      });

      return Promise.all(promises);
    },
    [contract]
  );

  const { data, isLoading } = useQuery({
    queryKey: ["transactionQueue", transactionIds],
    queryFn: () =>
      fetchTransactionData(transactionIds).catch((e) => {
        const msg = getErrorMessage(e);
        let defaultMsg =
          "An error has occurred while trying to fetch transaction ids";

        if (e.cause && Array.isArray(e.cause.logs) && e.cause.logs.length) {
          defaultMsg = e.cause.logs[0];
        }

        console.error(defaultMsg, msg);
        _setError(`${msg}: ${defaultMsg}`);
      }),
    enabled: !!transactionIds,
    refetchInterval: 10000, // Refetch every 10 seconds
  });

  const transactionData: TransactionDisplayInfo[] = [];

  data?.forEach((item) => {
    if (item.transaction) {
      transactionData.push({
        ...toTxQueueItem(item.transaction),
        approvalCount: item.approvals,
        rejectionCount: item.rejections,
      });
    }
  });

  return {
    transactionData,
    error: _error,
    isLoading: isLoading || isGettingIds,
  };
}
