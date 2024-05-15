import { useQuery } from "@tanstack/react-query";
import { Contract, FunctionFragment, JsonAbi } from "fuels";

interface Props {
  methodName: string;
  metadataContract: Contract | undefined;
}

export interface UseAbiMethodSelectorResult {
  selectedAbiMethod:
    | undefined
    | {
        isReadOnly: boolean;
        interfaceMethod: FunctionFragment<JsonAbi, string> | undefined;
      };
  selectedAbiMethodLoading: boolean;
}

export function useAbiMethodSelector({
  methodName,
  metadataContract,
}: Props): UseAbiMethodSelectorResult {
  const {
    data: dataSelectedAbiMethod,
    isLoading: isLoadingSelectedAbiMethod,
    isFetched: isFetchedSelectedAbiMethod,
  } = useQuery({
    retry: false,
    queryKey: [
      "selectedMethodAbi",
      methodName,
      metadataContract?.account?.address.toAddress(),
    ],
    queryFn: () => {
      const isReadOnly =
        metadataContract?.functions[methodName].isReadOnly() ?? true;
      const interfaceMethod = metadataContract?.interface.functions[methodName];

      return {
        isReadOnly,
        interfaceMethod,
      };
    },
    enabled: !!metadataContract,
  });

  return {
    selectedAbiMethod: dataSelectedAbiMethod,
    selectedAbiMethodLoading:
      !isFetchedSelectedAbiMethod || isLoadingSelectedAbiMethod,
  };
}
