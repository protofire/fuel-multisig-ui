import { useQuery } from "@tanstack/react-query";

import { MultisigLocalManagmentEvents } from "@/domain/events/MultisigLocalManagmentEvents";
import { useGetMultisigContract } from "@/hooks/multisigContract/useGetMultisigContract";
import { useEventListenerCallback } from "@/hooks/useEventListenerCallback";
import { IdentityOutput } from "@/services/contracts/multisig/contracts/FuelMultisigAbi";
import { parseFuelError } from "@/services/contracts/utils/parseFuelError";
import { customReportError } from "@/utils/error";

interface Props {
  contractId: string | undefined;
  onSuccess?: (owners: IdentityOutput[]) => void;
}

interface UseGetThresholdReturn {
  isLoading: boolean;
  owners: IdentityOutput[] | undefined;
  refetch: () => void;
}

export function useGetOwners({
  contractId,
  onSuccess,
}: Props): UseGetThresholdReturn {
  const { contract } = useGetMultisigContract({ contractId });

  const { data, isLoading, isFetched, refetch } = useQuery({
    queryKey: ["useGetOwners", contract?.account?.address.toString()],
    queryFn: async () => {
      return contract?.functions
        .get_owners()
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
    owners: data,
    isLoading: isLoading || !isFetched,
    refetch,
  };
}
