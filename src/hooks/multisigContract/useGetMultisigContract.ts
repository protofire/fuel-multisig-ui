import { useRef } from "react";

import {
  FuelMultisigAbi,
  FuelMultisigAbi__factory,
} from "@/services/contracts/multisig";

import { useGetContract } from "../useGetContract";

interface Props {
  contractId: string | undefined;
}

export interface UseGetMultisigContractResult {
  contract: FuelMultisigAbi | undefined;
}

export function useGetMultisigContract({
  contractId = "",
}: Props): UseGetMultisigContractResult {
  const contractRef = useRef<FuelMultisigAbi | undefined>(undefined);

  const { contract } = useGetContract<FuelMultisigAbi>({
    contractId,
    contractAbiFactory: FuelMultisigAbi__factory,
  });

  if (!contractRef.current && contract) {
    contractRef.current = contract;
  } else if (
    contract?.account?.address &&
    !contractRef.current?.account?.address.equals(contract?.account?.address)
  ) {
    contractRef.current = contract;
  }
  return { contract: contractRef.current };
}
