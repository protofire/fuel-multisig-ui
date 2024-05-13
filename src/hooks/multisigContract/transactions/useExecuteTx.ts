import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

import { DryRunExecutionResult } from "@/domain/DryRunExecutionResult";
import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import { useMultisigDryRunHandler } from "@/hooks/multisigContract/useMultisigDryRunHandler";

import { UseGetMultisigContractResult } from "../useGetMultisigContract";

interface Props {
  multisigSelected: MultisignatureAccount;
  multisigContract: UseGetMultisigContractResult["contract"];
  proposedTxId: string;
}

interface UseApproveTxResult {
  dryRunHandler: DryRunExecutionResult;
  execute: () => void;
  isLoading: boolean;
}

export function useExecuteTx({
  multisigSelected,
  multisigContract,
  proposedTxId,
}: Props): UseApproveTxResult {
  const dryRunHandler = useMultisigDryRunHandler({
    multisigContract,
    methodName: "execute_tx",
    methodArgs: [proposedTxId],
  });

  const _executeTx = useCallback(async () => {
    if (!multisigContract) return;
  }, [multisigContract]);

  const { mutate, isPending } = useMutation({
    mutationFn: _executeTx,
    mutationKey: ["executeTx", proposedTxId],
  });

  return {
    execute: mutate,
    dryRunHandler,
    isLoading: isPending,
  };
}
