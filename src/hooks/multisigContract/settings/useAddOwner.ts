import { useMutation } from "@tanstack/react-query";
import BigNumber from "bignumber.js";

import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import { AccountWalletItem } from "@/domain/ui/AccountSelectItem";
import { useAssetsInfoFinder } from "@/hooks/useGetBalance";
import { IDENTITY_ADDRESS } from "@/services/contracts/callData";
import { ContractCallParamsInput } from "@/services/contracts/multisig/contracts/FuelMultisigAbi";
import { toIdentityContractIdInput } from "@/services/contracts/transformers/toInputIdentity";
import { getHexFromAddress } from "@/services/fuel/connectors/transformer";
import { hex_to_bytes } from "@/utils/formatString";

import { useGetMultisigContract } from "../useGetMultisigContract";
import { useProposeTransaction } from "../useProposeTransaction";

interface Props {
  multisigAddress: MultisignatureAccount["address"];
  onSuccess?: () => void;
}

interface UseDeleteOwnerResult {
  addOwner: (onwer: AccountWalletItem) => void;
  isPending: boolean;
  ownerAdded: AccountWalletItem | undefined;
}

export function useAddOwner({
  multisigAddress,
  onSuccess,
}: Props): UseDeleteOwnerResult {
  const { contract: multisigContract } = useGetMultisigContract({
    contractId: multisigAddress,
  });
  const { proposeTransaction, isLoading } = useProposeTransaction();
  const { baseAssetId } = useAssetsInfoFinder();

  const mutation = useMutation({
    mutationKey: ["proposeAddOwner", multisigContract?.account?.address],
    mutationFn: async (owner: AccountWalletItem) => {
      const methodSelector =
        multisigContract?.interface.functions.add_owner.selectorBytes;

      if (!methodSelector) {
        throw Error("No add_owner selector found on multisig contract");
      }

      const hex_owner = getHexFromAddress(owner.address.bech32);
      // Assume that everything is and address
      const hex_owner_bytes = IDENTITY_ADDRESS.concat(hex_to_bytes(hex_owner));

      const callParams: ContractCallParamsInput = {
        calldata: hex_owner_bytes,
        forwarded_gas: 10_000_000, // TODO check why 0 is not working
        function_selector: methodSelector,
        transfer_params: {
          asset_id: { bits: baseAssetId },
          value: new BigNumber(0).toString(),
        },
      };

      return proposeTransaction({
        to: toIdentityContractIdInput(multisigAddress),
        params: { Call: callParams },
      }).then((r) => {
        return owner;
      });
    },
    onSettled: () => onSuccess?.(),
  });

  return {
    addOwner: mutation.mutate,
    isPending: mutation.isPending,
    ownerAdded: mutation.data,
  };
}
