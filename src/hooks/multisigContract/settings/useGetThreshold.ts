import { useQuery } from "@tanstack/react-query";

import { MultisigLocalManagmentEvents } from "@/domain/events/MultisigLocalManagmentEvents";
import { useGetMultisigContract } from "@/hooks/multisigContract/useGetMultisigContract";
import { useEventListenerCallback } from "@/hooks/useEventListenerCallback";
import { parseFuelError } from "@/services/contracts/utils/parseFuelError";
import { customReportError } from "@/utils/error";

interface Props {
  contractId: string | undefined;
  onSuccess?: (_threshold: number) => void;
}

interface UseGetThresholdReturn {
  isLoading: boolean;
  threshold: number | undefined;
  refetch: () => void;
}

export function useGetThreshold({
  contractId,
  onSuccess,
}: Props): UseGetThresholdReturn {
  const { contract } = useGetMultisigContract({ contractId });

  const { data, isLoading, isFetched, refetch } = useQuery({
    queryKey: ["useGetThreshold", contract?.account?.address.toString()],
    queryFn: async () => {
      return contract?.functions
        .get_threshold()
        .dryRun()
        .then((result) => {
          onSuccess?.(result.value);
          return result.value;
        })
        .catch((e) => {
          const parsedError = parseFuelError(e);
          const msg = customReportError(e);

          if (parsedError.log) {
            throw new Error(parsedError.log);
          } else if (parsedError.message) {
            throw new Error(parsedError.message);
          }

          throw new Error(msg);
        });
    },
    enabled: !!contract,
    refetchInterval: 20000,
    refetchOnWindowFocus: false,
  });

  useEventListenerCallback([MultisigLocalManagmentEvents.txExecuted], () =>
    refetch()
  );

  return {
    threshold: data,
    isLoading: isLoading || !isFetched,
    refetch,
  };
}
