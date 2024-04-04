import { useEffect, useState } from "react";

import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";

import { FuelContractId, IContractAbiFactory } from "./types";

type Contract<T> = T | undefined;

interface Props<T> {
  contractId: FuelContractId;
  contractAbiFactory: IContractAbiFactory<T>;
}

interface UseGetContractReturn<T> {
  contract: Contract<T>;
}

export function useGetContract<T>({
  contractId,
  contractAbiFactory,
}: Props<T>): UseGetContractReturn<T> {
  const { wallet } = useNetworkConnection();
  const [contract, setContract] =
    useState<UseGetContractReturn<T>["contract"]>(undefined);

  useEffect(() => {
    if (wallet) {
      const newContract = contractAbiFactory.connect(contractId, wallet);
      setContract(newContract);
    } else {
      setContract(undefined);
    }
  }, [contractId, wallet, contractAbiFactory]);

  return { contract };
}
