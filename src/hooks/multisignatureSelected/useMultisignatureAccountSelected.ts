import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useLocalDbContext } from "@/context/LocalDbContext/useLocalDbContext";
import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { MultisigLocalManagmentEvents } from "@/domain/events/MultisigLocalManagmentEvents";
import { MultisignatureAccount } from "@/domain/MultisignatureAccount";

import { useGetThreshold } from "../multisigContract/settings/useGetThreshold";
import { useEventListenerCallback } from "../useEventListenerCallback";

interface UseAccountMultisignatureSelected {
  multisigSelected: MultisignatureAccount | undefined;
}

export function useMultisignatureAccountSelected(): UseAccountMultisignatureSelected {
  const [multisigSelected, setMultisigSelected] = useState<
    MultisignatureAccount | undefined
  >();
  const { multisignatureSelectedRepository, multisignatureAccountsRepository } =
    useLocalDbContext();
  const { chainInfo } = useNetworkConnection();
  const { threshold, refetch: refetchThreshold } = useGetThreshold({
    contractId: multisigSelected?.address,
  });

  useEventListenerCallback([MultisigLocalManagmentEvents.txExecuted], () =>
    refetchThreshold()
  );

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
    mutationKey: [
      "useMultisignatureUpdate",
      threshold,
      multisigSelected?.address,
    ],
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

  return { multisigSelected };
}
