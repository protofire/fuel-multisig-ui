import { useQuery } from "@tanstack/react-query";

import { MultisigLocalManagmentEvents } from "@/domain/events/MultisigLocalManagmentEvents";
import { useMultisignatureAccountSelected } from "@/hooks/multisignatureSelected/useMultisignatureAccountSelected";
import { useEventListenerCallback } from "@/hooks/useEventListenerCallback";
import { parseFuelError } from "@/services/contracts/utils/parseFuelError";
import { customReportError } from "@/utils/error";

import { useGetMultisigContract } from "../useGetMultisigContract";

export function useGetTxIdList() {
  const { multisigSelected } = useMultisignatureAccountSelected();
  const { contract } = useGetMultisigContract({
    contractId: multisigSelected?.address,
  });

  const { data, error, isLoading, isFetched, refetch } = useQuery({
    queryKey: ["activeTxIds", multisigSelected?.address || ""],
    queryFn: async () => {
      const result = await contract?.functions
        .get_active_tx_ids()
        .dryRun()
        .catch((e) => {
          const parsedError = parseFuelError(e);
          const msg = customReportError(e);

          // Skip Invalid data size error
          if (parsedError.message === "Invalid vec data size.") {
            return { value: [] };
          } else if (parsedError.log) {
            throw new Error(parsedError.log);
          } else if (parsedError.message) {
            throw new Error(parsedError.message);
          }

          throw new Error(msg);
        });

      return result?.value ?? [];
    },
    refetchInterval: 15000,
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
