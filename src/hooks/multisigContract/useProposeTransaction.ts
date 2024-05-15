import { BigNumberish } from "fuels";
import { useCallback, useEffect, useState } from "react";

import { useInteractionError } from "@/context/InteractionErrorContext/useInteractionError";
import {
  IdentityInput,
  TransactionParametersInput,
} from "@/services/contracts/multisig/contracts/FuelMultisigAbi";
import { parseFuelError } from "@/services/contracts/utils/parseFuelError";
import { getCurrentDatePlusTenDays } from "@/utils/getCurrentDatePlusTenDays";

import { useMultisignatureAccountSelected } from "../multisignatureSelected/useMultisignatureAccountSelected";
import { useGetMultisigContract } from "./useGetMultisigContract";

interface ProposeTransactionProps {
  to: IdentityInput;
  txValidityDuration?: BigNumberish;
  params: TransactionParametersInput;
}

export interface UseProposeTransactionReturn {
  error: string | null;
  isLoading: boolean;
  proposeTransaction: () => void;
}

export function useProposeTransaction() {
  const [error, setError] = useState<string | null>(null);
  const { setError: setGlobalError } = useInteractionError();
  const [isLoading, setIsLoading] = useState(false);
  const { multisigSelected } = useMultisignatureAccountSelected();
  const { contract } = useGetMultisigContract({
    contractId: multisigSelected?.address,
  });

  const proposeTransaction = useCallback(
    async ({ to, txValidityDuration, params }: ProposeTransactionProps) => {
      const _txValidityDuration =
        txValidityDuration ?? getCurrentDatePlusTenDays();
      setError(null);
      setIsLoading(true);

      try {
        // const cost = await contract?.functions
        //   .propose_tx(to, txValidityDuration, { Transfer: params })
        //   .getTransactionCost();

        const _dryRun = await contract?.functions
          .propose_tx(to, _txValidityDuration, params)
          .dryRun();

        console.info("Dry run result", _dryRun);

        const response = await contract?.functions
          .propose_tx(to, _txValidityDuration, params)
          // .txParams({
          //   gasPrice: cost?.gasPrice,
          //   gasLimit: cost?.gasUsed.mul(1.1),
          // })
          .call();

        return response;
      } catch (e) {
        const { message, log } = parseFuelError(e);
        const defaultMsg = message
          ? message
          : "An error has ocurred while trying to propose tx";

        console.error(defaultMsg, message);
        setError(`${message}: ${log}`);
      } finally {
        setIsLoading(false);
      }
    },
    [contract?.functions]
  );

  useEffect(() => {
    setGlobalError(error ? { msg: error } : null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return { proposeTransaction, error, isLoading };
}
