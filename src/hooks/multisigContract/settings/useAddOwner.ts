import { useMutation } from "@tanstack/react-query";
import BigNumber from "bignumber.js";

import { BASE_ASSET_ID } from "@/config/assetsMap";
import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import { AccountWalletItem } from "@/domain/ui/AccountSelectItem";
import { IDENTITY_ADDRESS } from "@/services/contracts/callData";
import { ContractCallParamsInput } from "@/services/contracts/multisig/contracts/FuelMultisigAbi";
import { toIdentityInput } from "@/services/contracts/transformers/toInputIdentity";
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

  const mutation = useMutation({
    mutationKey: ["removeOwner", multisigContract?.account?.address],
    mutationFn: async (owner: AccountWalletItem) => {
      const methodSelector =
        multisigContract?.interface.functions.add_owner.selector;

      if (!methodSelector) {
        throw Error("No add_owner selector found on multisig contract");
      }

      const hex_owner = getHexFromAddress(owner.address.bech32);
      // Assume that everything is and address
      const hex_owner_bytes = IDENTITY_ADDRESS.concat(hex_to_bytes(hex_owner));

      const callParams: ContractCallParamsInput = {
        calldata: hex_owner_bytes,
        forwarded_gas: 0, // TODO check is this value needs to be changed
        function_selector: hex_to_bytes(methodSelector),
        single_value_type_arg: false, // Si recibe un solo parametro y es primitivo va en true, en cualquier otro caso va en false (AFAIK)
        transfer_params: {
          asset_id: { value: BASE_ASSET_ID },
          value: new BigNumber(0).toString(),
        },
      };

      return proposeTransaction({
        to: toIdentityInput(multisigAddress),
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
