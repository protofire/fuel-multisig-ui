import { useQuery } from "@tanstack/react-query";
import { Contract, InvocationCallResult } from "fuels";

interface Props {
  contract: Contract | undefined;
  methodName: string | undefined;
  callData: Array<unknown>;
}

export interface UseCustomContractDryRunHandlerResult {
  decodedValue: string | undefined;
  druRunHandler: InvocationCallResult | undefined;
  isLoading: boolean;
}

export function useCustomContractDryRunHandler({
  contract,
  methodName,
  callData,
}: Props): UseCustomContractDryRunHandlerResult {
  const { data, isLoading, isFetched } = useQuery({
    queryKey: ["useCustomContractDryRunHandler", methodName, callData],
    queryFn: async () => {
      if (!contract || !methodName) {
        return {
          decodedValue: undefined,
          druRunHandler: undefined,
        };
      }

      const response = await contract.functions[methodName](callData).dryRun();

      return {
        druRunHandler: response,
        decodedValue: response.value ? response.value.toString() : undefined,
      };
    },
    enabled: !!contract && !!methodName,
    initialData: {
      decodedValue: undefined,
      druRunHandler: undefined,
    },
  });

  return {
    ...data,
    isLoading: !isFetched || isLoading,
  };
}
