import { useQuery } from "@tanstack/react-query";

import { MultisigLocalManagmentEvents } from "@/domain/events/MultisigLocalManagmentEvents";
import { useMultisignatureAccountSelected } from "@/hooks/multisignatureSelected/useMultisignatureAccountSelected";
import { useEventListenerCallback } from "@/hooks/useEventListenerCallback";

import { useGetMultisigContract } from "../useGetMultisigContract";

export function useGetTxIdList() {
  const { multisigSelected } = useMultisignatureAccountSelected();
  const { contract } = useGetMultisigContract({
    contractId: multisigSelected?.address,
  });

  const { data, error, isLoading, isFetched, refetch } = useQuery({
    queryKey: ["activeTxIds", multisigSelected?.address || ""],
    queryFn: () =>
      contract?.functions
        .get_active_tx_ids()
        .dryRun()
        .then((result) => result.value ?? []),
    refetchInterval: 10000,
    enabled: !!multisigSelected?.address && !!contract,
    initialData: [],
  });

  useEventListenerCallback([MultisigLocalManagmentEvents.txExecuted], () =>
    refetch()
  );

  return {
    data,
    error,
    isLoading: isLoading || !isFetched,
    contract,
    multisigSelected,
  };
}
