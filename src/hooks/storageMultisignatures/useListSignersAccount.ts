import { useEffect, useState } from "react";

import { useLocalDbContext } from "@/context/LocalDbContext/useLocalDbContext";
import { MultisignatureAccount } from "@/domain/MultisignatureAccount";

interface UseListSignersAccountReturn {
  multisigs: MultisignatureAccount[] | null;
  isLoading: boolean;
  error: string | null;
}

export function useListSignersAccount(): UseListSignersAccountReturn {
  const [multisigs, setMultisigs] = useState<MultisignatureAccount[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { multisignatureAccountsRepository } = useLocalDbContext();

  useEffect(() => {
    setIsLoading(true);

    multisignatureAccountsRepository
      .listXsignersAccount()
      .then((accounts) => setMultisigs(accounts))
      .finally(() => setIsLoading(false));
  }, [multisignatureAccountsRepository]);

  return { multisigs, isLoading, error };
}
