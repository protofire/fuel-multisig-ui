import { useRef } from "react";

import {
  FuelMultisigAbi,
  FuelMultisigAbi__factory,
} from "@/services/contracts/multisig";

import { useGetContract } from "../useGetContract";

interface Props {
  contractId: string | undefined;
}

export function useGetMultisigContract({ contractId = "" }: Props) {
  const contractRef = useRef<FuelMultisigAbi | undefined>(undefined);

  const { contract } = useGetContract<FuelMultisigAbi>({
    contractId,
    contractAbiFactory: FuelMultisigAbi__factory,
  });

  if (!contractRef.current && contract) {
    contractRef.current = contract;
  }

  return { contract: contractRef.current };
}
