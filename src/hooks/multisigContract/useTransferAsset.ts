import { useMutation } from "@tanstack/react-query";

import {
  IdentityInput,
  TransferParamsInput,
} from "@/services/contracts/multisig/contracts/FuelMultisigAbi";

import { useProposeTransaction } from "./useProposeTransaction";

interface Props {
  to: IdentityInput;
  params: TransferParamsInput;
  onSuccess?: () => void;
}

interface UseTransferAssetResult {
  isPending: boolean;
  send: () => void;
}

export function useTransferAsset({
  to,
  params: _params,
  onSuccess,
}: Props): UseTransferAssetResult {
  const { proposeTransaction, isLoading } = useProposeTransaction();

  const mutation = useMutation({
    mutationKey: ["useTransferAsset", to, _params],
    mutationFn: async () => {
      return proposeTransaction({ to, params: { Transfer: _params } });
    },
    onSuccess: () => onSuccess?.(),
  });

  return {
    send: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
