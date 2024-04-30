import { useQuery } from "@tanstack/react-query";

import { useMultisignatureAccountSelected } from "@/hooks/multisignatureSelected/useMultisignatureAccountSelected";

import { useGetMultisigContract } from "../useGetMultisigContract";

export function useGetTxIdList() {
  const { multisigSelected } = useMultisignatureAccountSelected();
  const { contract } = useGetMultisigContract({
    contractId: multisigSelected?.address,
  });

  const fetchTxIds = async () => {
    if (!contract) return [];

    const result = await contract.functions.get_active_tx_ids().dryRun();
    return result.value ?? [];
  };

  const { data, error, isLoading, isFetched } = useQuery({
    queryKey: ["activeTxIds", multisigSelected?.address || ""],
    queryFn: fetchTxIds,
    refetchInterval: 10000,
    enabled: !!multisigSelected?.address && !!contract,
    initialData: [],
  });

  return { data, error, isLoading: isLoading || !isFetched, contract };
}
