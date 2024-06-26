import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

import {
  OwnerWithAction,
  SignerApprovalStatus,
  TransferProposed,
} from "@/domain/TransactionProposed";
import { useMultisignatureAccountSelected } from "@/hooks/multisignatureSelected/useMultisignatureAccountSelected";
import { toIdentityAddressInput } from "@/services/contracts/transformers/toInputIdentity";
import { getErrorMessage } from "@/utils/error";

import { useGetMultisigContract } from "../useGetMultisigContract";

interface Props {
  txId: TransferProposed["id"];
}

interface UseTxSignersResult {
  isLoading: boolean;
  error: string | null;
  data: Array<OwnerWithAction> | undefined;
}

function boolToApprovedBySigner(
  approved: boolean | undefined
): SignerApprovalStatus {
  if (approved === true) return "Approved";

  return approved === false ? "Rejected" : "Pending";
}

export function useTxSigners({ txId }: Props): UseTxSignersResult {
  const { multisigSelected } = useMultisignatureAccountSelected();
  const { contract } = useGetMultisigContract({
    contractId: multisigSelected?.address,
  });

  const fetchData = useCallback(
    async (txId: Props["txId"]) => {
      if (!multisigSelected || !contract) return [];

      return Promise.all(
        multisigSelected.owners.map(async (owner) => {
          try {
            const transaction = await contract.functions
              .get_tx_approval_by_owner(txId, toIdentityAddressInput(owner.address))
              .dryRun();

            return {
              ...owner,
              status: boolToApprovedBySigner(transaction.value),
            };
          } catch (error) {
            console.error(
              `Error fetching owner ${owner.name} approval for transaction ID",
              ${txId.toString()}`,
              error
            );
            return null;
          }
        })
      );
    },
    [contract, multisigSelected]
  );

  const { data, isLoading, error, isFetched } = useQuery({
    queryKey: ["transactionSigners", txId],
    queryFn: () => fetchData(txId),
    enabled: !!multisigSelected,
    refetchInterval: 10000, // Refetch every 10 seconds
  });

  const _data = data?.filter((tx): tx is NonNullable<typeof tx> => tx !== null);

  return {
    data: _data,
    error: error && getErrorMessage(error),
    isLoading: isLoading || !isFetched,
  };
}
