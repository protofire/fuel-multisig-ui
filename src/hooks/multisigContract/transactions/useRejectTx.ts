import { useMutation } from "@tanstack/react-query";

import { DryRunExecutionResult } from "@/domain/DryRunExecutionResult";
import { MultisigLocalManagmentEvents } from "@/domain/events/MultisigLocalManagmentEvents";
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
  reject: () => void;
  isPending: boolean;
}

export function useRejectTx({
  multisigContract,
  proposedTxId,
  onSuccess,
}: Props): UseApproveTxResult {
  const dryRunHandler = useMultisigDryRunHandler({
    multisigContract,
    methodName: "reject_tx",
    methodArgs: [proposedTxId],
    successOutcome: "You can vote",
    failureOutcome: "You can't vote",
  });

  const mutation = useMutation({
    mutationKey: ["rejectTx", proposedTxId, multisigContract?.account?.address],
    mutationFn: async () => {
      return multisigContract?.functions
        .reject_tx(proposedTxId)
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
    onSuccess: () => {
      document.dispatchEvent(
        new CustomEvent(MultisigLocalManagmentEvents.txRejected)
      );
    },
  });

  return {
    reject: mutation.mutate,
    dryRunHandler,
    isPending: mutation.isPending,
  };
}
