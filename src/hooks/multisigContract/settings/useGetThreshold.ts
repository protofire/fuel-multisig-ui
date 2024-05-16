import { useQuery } from "@tanstack/react-query";

import { useGetMultisigContract } from "@/hooks/multisigContract/useGetMultisigContract";
import { parseFuelError } from "@/services/contracts/utils/parseFuelError";
import { customReportError } from "@/utils/error";

interface Props {
  contractId: string | undefined;
}

interface UseGetThresholdReturn {
  isLoading: boolean;
  threshold: number | undefined;
  refetch: () => void;
}

export function useGetThreshold({ contractId }: Props): UseGetThresholdReturn {
  const { contract } = useGetMultisigContract({ contractId });

  const { data, isLoading, isFetched, refetch } = useQuery({
    queryKey: ["useGetThreshold", contract?.account?.address.toString()],
    queryFn: async () => {
      return contract?.functions
        .get_threshold()
        .txParams({
          gasPrice: 1,
          gasLimit: 100_000,
        })
        .dryRun()
        .then((result) => {
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

  return {
    threshold: data,
    isLoading: isLoading || !isFetched,
    refetch,
  };
}
