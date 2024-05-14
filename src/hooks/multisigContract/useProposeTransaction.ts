import { BigNumberish } from "fuels";
import { useCallback, useState } from "react";

import {
  IdentityInput,
  TransactionParametersInput,
} from "@/services/contracts/multisig/contracts/FuelMultisigAbi";
import { customReportError, getErrorMessage } from "@/utils/error";
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

        customReportError(_dryRun);

        const response = await contract?.functions
          .propose_tx(to, _txValidityDuration, params)
          // .txParams({
          //   gasPrice: cost?.gasPrice,
          //   gasLimit: cost?.gasUsed.mul(1.1),
          // })
          .call();

        return response;
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
