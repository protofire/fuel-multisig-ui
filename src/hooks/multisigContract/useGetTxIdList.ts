import { BigNumberish } from "fuels";
import { useCallback, useEffect, useState } from "react";

import { TransactionOutput } from "@/services/contracts/multisig/contracts/FuelMultisigAbi";
import { getErrorMessage } from "@/utils/error";

import { useMultisignatureAccountSelected } from "../multisignatureSelected/useMultisignatureAccountSelected";
import { useGetMultisigContract } from "./useGetMultisigContract";

export function useGetTxIdList() {
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const { multisigSelected } = useMultisignatureAccountSelected();
  const { contract } = useGetMultisigContract({
    contractId: multisigSelected?.address,
  });

  const getTxIdList = useCallback(async () => {
    setError(undefined);
    setIsLoading(true);
    try {
      const result = await contract?.functions.get_active_tx_ids().dryRun();

      return result;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const msg = getErrorMessage(e);
      let defaultMsg =
        "An error has ocurred while trying to fetch transaction ids";

      if (e.cause && Array.isArray(e.cause.logs) && e.cause.logs.length) {
        defaultMsg = e.cause.logs[0];
      }

      console.error(defaultMsg, msg);
      setError(`${msg}: ${defaultMsg}`);
    } finally {
      setIsLoading(false);
    }
  }, [contract?.functions]);

  return { getTxIdList, error, isLoading, contract };
}

export function useGetTransactionQueue() {
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const { getTxIdList, contract } = useGetTxIdList();
  const [transactionData, setTransactionData] = useState<
    TransactionOutput[] | undefined
  >();

  const getTransactionQueue = useCallback(async () => {
    setError(undefined);
    setIsLoading(true);
    try {
      const transactionIds: { value: BigNumberish[] } | undefined =
        await getTxIdList();

      if (transactionIds === undefined) {
        throw Error("Error calling get_active_tx_ids on contract");
      }

      const transactions = await Promise.all(
        transactionIds.value.map(async (_id) => {
          return contract?.functions.get_tx(_id).dryRun();
        })
      );

      setTransactionData(
        transactions
          .map((t) => t?.value)
          .filter((t): t is TransactionOutput => t !== undefined)
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const msg = getErrorMessage(e);
      let defaultMsg =
        "An error has ocurred while trying to fetch transaction ids";

      if (e.cause && Array.isArray(e.cause.logs) && e.cause.logs.length) {
        defaultMsg = e.cause.logs[0];
      }

      console.error(defaultMsg, msg);
      setError(`${msg}: ${defaultMsg}`);
    } finally {
      setIsLoading(false);
    }
  }, [contract?.functions, getTxIdList]);

  useEffect(() => {
    getTransactionQueue();
  }, [getTransactionQueue]);

  return { getTransactionQueue, error, isLoading, transactionData };
}
