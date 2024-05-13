import { FunctionInvocationResult } from "fuels";
import { useCallback, useEffect, useState } from "react";

import { useInteractionError } from "@/context/InteractionErrorContext/useInteractionError";
import { toIdentityInputs } from "@/services/contracts/transformers/toInputIdentity";
import { parseFuelError } from "@/services/contracts/utils/parseFuelError";
import { getErrorMessage } from "@/utils/error";

import { useGetMultisigContract } from "./useGetMultisigContract";

interface Props {
  contractId: string | undefined;
}

interface UseSetupMultisigReturn {
  setupMultisig: (
    threshold: number,
    users: string[]
  ) => Promise<FunctionInvocationResult<void> | undefined>;
  isLoading: boolean;
}

export function useSetupMultisig({
  contractId,
}: Props): UseSetupMultisigReturn {
  const [error, setError] = useState<string | undefined>();
  const [errorDecoy, setErrorDecoy] = useState<string | undefined>();
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
        const result = await contract.functions
          .constructor(threshold, _usersIdentity)
          .call()
          .then((_result) => _result)
          .catch(async (errorCallreason) => {
            // Skip struct data size false positive error when dryRun display AlreadyInitialized
            const { message: msg } = parseFuelError(errorCallreason);
            if (
              typeof msg === "string" &&
              msg.includes("Invalid struct data size")
            ) {
              try {
                return await contract.functions
                  .constructor(threshold, _usersIdentity)
                  .dryRun();
              } catch (errorDryRun) {
                const dryRunMsg = getErrorMessage(errorDryRun);

                if (
                  typeof msg === "string" &&
                  dryRunMsg.includes("AlreadyInitialized")
                ) {
                  console.dir(errorCallreason, { depth: null });
                  return errorCallreason;
                }
              }
            }

            throw Error(msg);
          });

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
