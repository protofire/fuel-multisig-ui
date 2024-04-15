import { useCallback, useState } from "react";

import { useLocalDbContext } from "@/context/LocalDbContext/useLocalDbContext";
import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import { customReportError } from "@/utils/error";

export interface UseSaveMultisignatureSelectedReturn {
  save: (multisigAccount: MultisignatureAccount | "") => void;
  isLoading: boolean;
  error: string | null;
}

export function useSaveMultisignatureSelected(): UseSaveMultisignatureSelectedReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { multisignatureSelectedRepository } = useLocalDbContext();

  const save = useCallback(
    (multisigAccount: MultisignatureAccount | ""): void => {
      if (multisigAccount === "") {
        multisignatureSelectedRepository.saveAccount("");
        return;
      }

      setIsLoading(true);
      try {
        multisignatureSelectedRepository.saveAccount(multisigAccount.address);

        return;
      } catch (err) {
        const errorFormated = customReportError(err);
        setError(errorFormated);
      } finally {
        setIsLoading(false);
      }
    },
    [multisignatureSelectedRepository]
  );

  return { save, isLoading, error };
}
