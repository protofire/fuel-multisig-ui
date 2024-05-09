import { useQuery } from "@tanstack/react-query";

import { useMultisignatureAccountSelected } from "@/hooks/multisignatureSelected/useMultisignatureAccountSelected";

import { useGetMultisigContract } from "../useGetMultisigContract";

export function useGetTxIdList() {
  const { multisigSelected } = useMultisignatureAccountSelected();
  const { contract } = useGetMultisigContract({
    contractId: multisigSelected?.address,
  });

  const { data, error, isLoading, isFetched } = useQuery({
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

  return { data, error, isLoading: isLoading || !isFetched, contract };
}
