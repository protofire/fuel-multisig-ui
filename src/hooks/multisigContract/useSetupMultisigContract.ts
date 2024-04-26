import { InvocationCallResult } from "fuels";
import { useCallback, useEffect, useState } from "react";

import { useInteractionError } from "@/context/InteractionErrorContext/useInteractionError";
import { toIdentityInputs } from "@/services/contracts/transformers/toInputIdentity";
import { getErrorMessage } from "@/utils/error";

import { useGetMultisigContract } from "./useGetMultisigContract";

interface Props {
  contractId: string | undefined;
}

interface UseSetupMultisigReturn {
  setupMultisig: (
    threshold: number,
    users: string[]
  ) => Promise<InvocationCallResult<void> | undefined>;
  isLoading: boolean;
}

export function useSetupMultisig({
  contractId,
}: Props): UseSetupMultisigReturn {
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const { setError: setGlobalError } = useInteractionError();
  const { contract } = useGetMultisigContract({ contractId });

  const setupMultisig = useCallback(
    async (threshold: number, users: string[]) => {
      if (!contract) return;

      setError(undefined);
      setIsLoading(true);
      const _usersIdentity = toIdentityInputs(users);
      try {
        const cost = await contract.functions
          .constructor(threshold, _usersIdentity)
          .getTransactionCost();

        const result = await contract.functions
          .constructor(threshold, _usersIdentity)
          .txParams({
            gasPrice: cost.gasPrice,
            gasLimit: cost.gasUsed,
          })
          .dryRun();

        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        const msg = getErrorMessage(e);
        let defaultMsg =
          "An error has ocurred while trying to configure the multisig";

        if (e.cause && Array.isArray(e.cause.logs) && e.cause.logs.length) {
          defaultMsg = e.cause.logs[0];
        }

        console.error(defaultMsg, msg);
        setError(`${msg}: ${defaultMsg}`);
      } finally {
        setIsLoading(false);
      }
    },
    [contract]
  );

  useEffect(() => {
    setGlobalError(error ? { msg: error } : null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return { setupMultisig, isLoading };
}
