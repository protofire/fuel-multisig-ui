import { useMutation } from "@tanstack/react-query";

import { DryRunExecutionResult } from "@/domain/DryRunExecutionResult";
import { useMultisigDryRunHandler } from "@/hooks/multisigContract/useMultisigDryRunHandler";
import { parseFuelError } from "@/services/contracts/utils/parseFuelError";
import { customReportError } from "@/utils/error";

import { UseGetMultisigContractResult } from "../useGetMultisigContract";

interface Props {
  multisigContract: UseGetMultisigContractResult["contract"];
  proposedTxId: string;
  accountConnected: string | undefined;
  onSuccess?: () => void;
}

interface UseApproveTxResult {
  dryRunHandler: DryRunExecutionResult;
  approve: () => void;
  isPending: boolean;
}

export function useApproveTx({
  multisigContract,
  proposedTxId,
  accountConnected,
  onSuccess,
}: Props): UseApproveTxResult {
  const dryRunHandler = useMultisigDryRunHandler({
    multisigContract,
    methodName: "approve_tx",
    methodArgs: [proposedTxId],
    successOutcome: "You can vote",
    failureOutcome: "You can't vote",
  });

  // const _approve = useCallback(async () => {
  //   multisigContract?.functions.approve_tx(proposedTxId);
  // }, []);

  const mutation = useMutation({
    mutationKey: [
      "approveTx",
      proposedTxId,
      multisigContract?.account?.address,
    ],
    mutationFn: async () => {
      return multisigContract?.functions
        .approve_tx(proposedTxId)
        .call()
        .catch((e) => {
          const parsedError = parseFuelError(e);
          const msg = customReportError(e);

          if (parsedError.log) {
            throw new Error(parsedError.log);
          } else if (parsedError.message) {
            throw new Error(parsedError.message);
          }

          throw new Error(msg);
        });
    },
    onMutate: () => onSuccess?.(),
  });

  return {
    approve: mutation.mutate,
    dryRunHandler,
    isPending: mutation.isPending,
  };
}
