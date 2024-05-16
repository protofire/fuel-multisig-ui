import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useLocalDbContext } from "@/context/LocalDbContext/useLocalDbContext";
import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { MultisignatureAccount, Owner } from "@/domain/MultisignatureAccount";
import { IdentityOutput } from "@/services/contracts/multisig/contracts/FuelMultisigAbi";
import { getAccountWallet } from "@/services/fuel/connectors/transformer";
import { isContractIdInput } from "@/services/fuel/guards";

import { useGetOwners } from "../multisigContract/settings/useGetOwners";
import { useGetThreshold } from "../multisigContract/settings/useGetThreshold";

interface UseAccountMultisignatureSelected {
  multisigSelected: MultisignatureAccount | undefined;
}

function updateOwners(
  currentOwners: Owner[],
  newOwners: IdentityOutput[]
): Owner[] {
  const currentOwnersMap = new Map(
    currentOwners.map((owner) => [owner.address, owner])
  );

  const updatedOwners: Owner[] = newOwners.map((newOwner, index) => {
    const address = isContractIdInput(newOwner)
      ? newOwner.ContractId.value
      : newOwner.Address.value;
    const accountWallet = getAccountWallet(address);
    const existingOwner = currentOwnersMap.get(accountWallet.bech32);
    const name = existingOwner ? existingOwner.name : `Signer ${index + 1}`;

    return { address: accountWallet.bech32, name };
  });

  return updatedOwners;
}

export function useMultisignatureAccountSelected(): UseAccountMultisignatureSelected {
  const [multisigSelected, setMultisigSelected] = useState<
    MultisignatureAccount | undefined
  >();
  const { multisignatureSelectedRepository, multisignatureAccountsRepository } =
    useLocalDbContext();
  const { chainInfo } = useNetworkConnection();
  const { threshold } = useGetThreshold({
    contractId: multisigSelected?.address,
  });
  const { owners } = useGetOwners({
    contractId: multisigSelected?.address,
  });

  useEffect(() => {
    if (!chainInfo) return;

    const accountSelected = multisignatureSelectedRepository.getAccount();
    if (accountSelected) {
      multisignatureAccountsRepository
        .getSignatoryAccount(chainInfo.chainId, accountSelected)
        .then((account) => setMultisigSelected(account));
    }
  }, [
    chainInfo,
    multisignatureAccountsRepository,
    multisignatureSelectedRepository,
  ]);

  const mutation = useMutation({
    mutationKey: ["useMultisignatureUpdate", multisigSelected?.address],
    mutationFn: async (params: Partial<MultisignatureAccount>) => {
      if (!multisigSelected) return;

      multisignatureAccountsRepository
        .updateSignatoryAccount(multisigSelected, params)
        .then((multisigUpdated) => {
          setMultisigSelected(multisigUpdated);
        });
    },
  });

  useEffect(() => {
    if (
      !multisigSelected ||
      !threshold ||
      multisigSelected.threshold === threshold
    ) {
      return;
    }

    mutation.mutate({ threshold });
  }, [multisigSelected, mutation, threshold]);

  useEffect(() => {
    if (
      !multisigSelected ||
      !owners ||
      multisigSelected.owners.length === owners.length
    ) {
      return;
    }

    const _updatedOwners = updateOwners(multisigSelected.owners, owners);
    mutation.mutate({ owners: _updatedOwners });
  }, [multisigSelected, mutation, owners]);

  return { multisigSelected };
}
