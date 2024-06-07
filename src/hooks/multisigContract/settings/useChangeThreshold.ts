import { useMutation } from "@tanstack/react-query";
import BigNumber from "bignumber.js";

import { BASE_ASSET_ID } from "@/config/assetsMap";
import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import { ContractCallParamsInput } from "@/services/contracts/multisig/contracts/FuelMultisigAbi";
import { toIdentityContractIdInput } from "@/services/contracts/transformers/toInputIdentity";
import { hex_to_bytes } from "@/utils/formatString";

import { useGetMultisigContract } from "../useGetMultisigContract";
import { useProposeTransaction } from "../useProposeTransaction";

interface Props {
  multisigAddress: MultisignatureAccount["address"];
  onSuccess?: () => void;
}

interface UseChangeTresholdResult {
  proposeChangeThreshold: (threshold: number) => void; // threshold must be between 1 - 255
  isPending: boolean;
}

export function useChangeThreshold({
  multisigAddress,
  onSuccess,
}: Props): UseChangeTresholdResult {
  const { contract: multisigContract } = useGetMultisigContract({
    contractId: multisigAddress,
  });
  const { proposeTransaction, isLoading } = useProposeTransaction();

  const mutation = useMutation({
    mutationKey: ["proposeChangeThreshold", multisigContract?.account?.address],
    mutationFn: async (threshold: number) => {
      const methodSelector =
        multisigContract?.interface.functions.change_threshold.selector;

      if (!methodSelector) {
        throw Error("No change_threshold selector found on multisig contract");
      }

      const callParams: ContractCallParamsInput = {
        calldata: [0, 0, 0, 0, 0, 0, 0, threshold],
        forwarded_gas: 10_000_000,
        function_selector: hex_to_bytes(methodSelector),
        transfer_params: {
          asset_id: { bits: BASE_ASSET_ID },
          value: new BigNumber(0).toString(),
        },
      };

      return proposeTransaction({
        to: toIdentityContractIdInput(multisigAddress),
        params: { Call: callParams },
      }).then((r) => {
        return true;
      });
    },
    onSettled: () => onSuccess?.(),
  });

  return {
    proposeChangeThreshold: mutation.mutate,
    isPending: mutation.isPending,
  };
}
