import { useEffect, useState } from "react";

import { useLocalDbContext } from "@/context/LocalDbContext/useLocalDbContext";
import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { MultisignatureAccount } from "@/domain/MultisignatureAccount";

interface UseAccountMultisignatureSelected {
  multisigSelected: MultisignatureAccount | undefined;
}

export function useMultisignatureAccountSelected(): UseAccountMultisignatureSelected {
  const [multisigSelected, setMultisigSelected] = useState<
    MultisignatureAccount | undefined
  >();
  const { multisignatureSelectedRepository, multisignatureAccountsRepository } =
    useLocalDbContext();
  const { chainInfo } = useNetworkConnection();

  useEffect(() => {
    if (!chainInfo) return;

    const accountSelected = multisignatureSelectedRepository.getAccount();
    if (accountSelected) {
      multisignatureAccountsRepository
        .getSignatoryAccount(chainInfo.chainId, accountSelected)
        .then((account) => setMultisigSelected(account));
    }
  }, [
    chainInfo,
    multisignatureAccountsRepository,
    multisignatureSelectedRepository,
  ]);

  return { multisigSelected };
}
