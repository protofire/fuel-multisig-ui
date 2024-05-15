import { Account, Contract, JsonAbi } from "fuels";
import { useEffect, useState } from "react";

import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";

import { useAddressInFormatPicked } from "./useAddressInFormatPicked";
import { FuelContractId } from "./useGetContract/types";

interface Props {
  contractId: FuelContractId;
  jsonAbi: JsonAbi;
  walletAddress?: string;
}

interface UseGetContractReturn {
  contract: Contract | undefined;
}

export function useContractFromMetadata({
  contractId,
  jsonAbi,
  walletAddress,
}: Props): UseGetContractReturn {
  const { wallet } = useNetworkConnection();
  const [contract, setContract] = useState<UseGetContractReturn["contract"]>();
  const { addressFormatted } = useAddressInFormatPicked({
    accountWallet: walletAddress,
    b256Format: true,
  });

  useEffect(() => {
    if (!wallet || !contractId) {
      setContract(undefined);
      return;
    }

    const walletOrProvider = addressFormatted
      ? new Account(addressFormatted, wallet.provider)
      : wallet;
    const _contract = new Contract(contractId, jsonAbi, walletOrProvider);
    setContract(_contract);
  }, [contractId, wallet, jsonAbi, addressFormatted]);

  return { contract };
}
