import { useCallback, useState } from "react";

import {
  IdentityInput,
  TransferParamsInput,
} from "@/services/contracts/multisig/contracts/FuelMultisigAbi";
import { getErrorMessage } from "@/utils/error";
import { getCurrentDatePlusTenDays } from "@/utils/getCurrentDatePlusTenDays";

import { useMultisignatureAccountSelected } from "../multisignatureSelected/useMultisignatureAccountSelected";
import { useGetMultisigContract } from "./useGetMultisigContract";

interface ProposeTransactionProps {
  to: IdentityInput;
  params: TransferParamsInput;
}

export interface UseProposeTransactionReturn {
  error: string | null;
  isLoading: boolean;
  proposeTransaction: () => void;
}

export function useProposeTransaction() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { multisigSelected } = useMultisignatureAccountSelected();
  const { contract } = useGetMultisigContract({
    contractId: multisigSelected?.address,
  });

  const proposeTransaction = useCallback(
    async ({ to, params }: ProposeTransactionProps) => {
      const txValidityDuration = getCurrentDatePlusTenDays();
      setError(null);
      setIsLoading(true);

      try {
        const cost = await contract?.functions
          .propose_tx(to, txValidityDuration, { Transfer: params })
          .getTransactionCost();

        const response = await contract?.functions
          .propose_tx(to, txValidityDuration, { Transfer: params })
          .txParams({
            gasPrice: cost?.gasPrice,
            gasLimit: cost?.gasUsed.mul(1.1),
          })
          .call();

        console.log("__response", response);
      } catch (e) {
        const msg = getErrorMessage(e);
        const defaultMsg = "An error has ocurred while trying to propose tx";

        console.error(defaultMsg, msg);
        setError(`${msg}: ${defaultMsg}`);
      } finally {
        setIsLoading(false);
      }
    },
    [contract?.functions]
  );

  return { proposeTransaction, error, isLoading };
}