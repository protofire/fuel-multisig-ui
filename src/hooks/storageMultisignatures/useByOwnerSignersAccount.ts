import { useEffect, useState } from "react";

import { useLocalDbContext } from "@/context/LocalDbContext/useLocalDbContext";
import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { MultisignatureAccount } from "@/domain/MultisignatureAccount";

interface UseByOwnerSignersAccountReturn {
  multisigs: MultisignatureAccount[] | null;
  isLoading: boolean;
  error: string | null;
}

export function useByOwnerSignersAccount(): UseByOwnerSignersAccountReturn {
  const [multisigs, setMultisigs] = useState<MultisignatureAccount[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { multisignatureAccountsRepository } = useLocalDbContext();
  const { accountConnected } = useNetworkConnection();

  useEffect(() => {
    if (!accountConnected) return;

    setIsLoading(true);

    multisignatureAccountsRepository
      .findSignatoriesByOwner(accountConnected)
      .then((accounts) => setMultisigs(accounts))
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false));
  }, [accountConnected, multisignatureAccountsRepository]);

  return { multisigs, isLoading, error };
}
