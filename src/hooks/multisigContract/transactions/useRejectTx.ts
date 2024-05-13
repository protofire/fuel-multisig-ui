import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

import { DryRunExecutionResult } from "@/domain/DryRunExecutionResult";
import { useMultisigDryRunHandler } from "@/hooks/multisigContract/useMultisigDryRunHandler";

import { UseGetMultisigContractResult } from "../useGetMultisigContract";

interface Props {
  multisigContract: UseGetMultisigContractResult["contract"];
  proposedTxId: string;
  accountConnected: string | undefined;
  onSuccess: () => void;
}

interface UseApproveTxResult {
  dryRunHandler: DryRunExecutionResult;
  reject: () => void;
}

export function useRejectTx({
  multisigContract,
  proposedTxId,
}: Props): UseApproveTxResult {
  const dryRunHandler = useMultisigDryRunHandler({
    multisigContract,
    methodName: "reject_tx",
    methodArgs: [proposedTxId],
    successOutcome: "You can vote",
    failureOutcome: "You can't vote",
  });

  const reject = useCallback(() => {
    console.log("__approve");
  }, []);

  const { data, isPending } = useQuery({
    queryFn: reject,
    queryKey: ["approve", proposedTxId],
  });

  return {
    reject,
    dryRunHandler,
  };
}
