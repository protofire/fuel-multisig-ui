/* eslint-disable @typescript-eslint/no-explicit-any */

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { DryRunExecutionResult } from "@/domain/DryRunExecutionResult";
import { FuelMultisigAbi } from "@/services/contracts/multisig";
import { parseFuelError } from "@/services/contracts/utils/parseFuelError";
import { customReportError, getErrorMessage } from "@/utils/error";

import { UseGetMultisigContractResult } from "./useGetMultisigContract";

type ContractFunctionArgs<
  T extends { functions: Record<string, (...args: any) => any> },
  K extends keyof T["functions"]
> = T["functions"][K] extends (...args: infer P) => any ? P : never;

type ContractMethods = keyof FuelMultisigAbi["functions"];

interface Props<K extends ContractMethods> {
  multisigContract: UseGetMultisigContractResult["contract"];
  methodName: K;
  methodArgs: ContractFunctionArgs<FuelMultisigAbi, K>;
  successOutcome?: string;
  failureOutcome?: string;
  refetchInterval?: false | number; // frequency in milliseconds
}

function executeDryRun<K extends ContractMethods>({
  methodName,
  methodArgs,
  multisigContract,
}: Pick<Props<K>, "methodArgs" | "methodName" | "multisigContract">) {
  if (!multisigContract || !multisigContract.functions[methodName]) {
    console.error("Contract or method is not defined.");
    throw Error("Contract or method is not available");
  }

  const method = multisigContract.functions[methodName];
  const transaction = method(...(methodArgs as any[]));

  return transaction.dryRun();
}

export function useMultisigDryRunHandler<K extends ContractMethods>({
  multisigContract,
  methodName,
  methodArgs,
  successOutcome = "Transaction will be executed",
  failureOutcome = "Transaction will be reverted",
  refetchInterval = 15000,
}: Props<K>): DryRunExecutionResult {
  const [_outComeError, setOutcomeError] = useState(failureOutcome);

  const { data, error, isError, refetch, isFetching, isFetched } = useQuery({
    queryKey: [
      "dryRun",
      methodName,
      methodArgs,
      multisigContract?.account?.address.toString(),
    ],
    queryFn: async () => {
      setOutcomeError(failureOutcome);

      return executeDryRun({ methodName, methodArgs, multisigContract })
        .then(() => {
          return successOutcome;
        })
        .catch((e) => {
          const parsedError = parseFuelError(e);
          const msg = customReportError(e);

          if (parsedError.log) {
            setOutcomeError((prev) => `${prev}, ${parsedError.log}`);
          } else if (parsedError.message) {
            throw new Error(parsedError.message);
          }

          throw new Error(msg);
        });
    },
    staleTime: Infinity,
    retry: 0,
    refetchInterval,
  });

  return {
    outcome: isError ? _outComeError : (data as string | undefined),
    executeDryRun: refetch,
    error: isError ? getErrorMessage(error) : undefined,
    isRunning: isFetching,
    isFetched,
  };
}
