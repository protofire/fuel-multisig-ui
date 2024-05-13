import { useMutation } from "@tanstack/react-query";

import { DryRunExecutionResult } from "@/domain/DryRunExecutionResult";
import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import { useMultisigDryRunHandler } from "@/hooks/multisigContract/useMultisigDryRunHandler";
import { parseFuelError } from "@/services/contracts/utils/parseFuelError";
import { customReportError } from "@/utils/error";

import { UseGetMultisigContractResult } from "../useGetMultisigContract";

interface Props {
  multisigSelected: MultisignatureAccount;
  multisigContract: UseGetMultisigContractResult["contract"];
  proposedTxId: string;
  onSuccess?: () => void;
}

interface UseApproveTxResult {
  dryRunHandler: DryRunExecutionResult;
  execute: () => void;
  isPending: boolean;
}

export function useExecuteTx({
  multisigSelected,
  multisigContract,
  proposedTxId,
  onSuccess,
}: Props): UseApproveTxResult {
  const dryRunHandler = useMultisigDryRunHandler({
    multisigContract,
    methodName: "execute_tx",
    methodArgs: [proposedTxId],
  });

  const mutation = useMutation({
    mutationKey: [
      "executeTx",
      proposedTxId,
      multisigContract?.account?.address,
    ],
    mutationFn: async () => {
      return multisigContract?.functions
        .execute_tx(proposedTxId)
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
    execute: mutation.mutate,
    dryRunHandler,
    isPending: mutation.isPending,
  };
}
