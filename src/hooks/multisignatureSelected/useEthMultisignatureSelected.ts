import { useBalance } from "@fuels/react";
import { useEffect, useState } from "react";

import { assetsMap, BASE_ASSET_ID } from "@/config/assetsMap";
import { useLocalDbContext } from "@/context/LocalDbContext/useLocalDbContext";
import { irregularToDecimalFormatted } from "@/utils/bnJsFormatter";

export interface UseBalanceMultisignatureSelected {
  balance: string | undefined;
}

export function useEthMultisignatureSelected() {
  const [contractId, setContractId] = useState<string | undefined>();
  const [balance, setBalance] = useState<string | undefined>();
  const { multisignatureSelectedRepository } = useLocalDbContext();
  const {
    balance: _balance,
    isFetching,
    isLoading,
  } = useBalance({ address: contractId });
  const _isLoading = isFetching || isLoading;

  useEffect(() => {
    const accountSelected = multisignatureSelectedRepository.getAccount();

    if (accountSelected) {
      setContractId(accountSelected);
    }
  }, [multisignatureSelectedRepository]);

  useEffect(() => {
    const _formatted = irregularToDecimalFormatted(_balance ?? undefined, {
      significantFigures: 4,
      assetInfo: assetsMap[BASE_ASSET_ID],
    });
    setBalance(_formatted);
  }, [_balance]);

  return { balance, isFetching: _isLoading };
}
