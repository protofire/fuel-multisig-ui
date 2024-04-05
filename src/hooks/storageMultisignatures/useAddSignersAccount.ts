import { useCallback, useState } from "react";

import { useLocalDbContext } from "@/context/LocalDbContext/useLocalDbContext";
import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import { customReportError } from "@/utils/error";

interface SaveOptions {
  onSuccess?: (account: MultisignatureAccount) => void;
  onFallback?: (error: string) => void;
}

interface SaveXsignerProps {
  account: MultisignatureAccount;
  options?: SaveOptions;
}

export interface UseAddSignersAccount {
  save: (props: SaveXsignerProps) => Promise<MultisignatureAccount | void>;
  isLoading: boolean;
  error: string | null;
}

export function useAddSignersAccount(): UseAddSignersAccount {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { multisignatureAccountsRepository, multisignatureSelectedRepository } =
    useLocalDbContext();

  const save = useCallback(
    async (props: SaveXsignerProps): Promise<MultisignatureAccount | void> => {
      setIsLoading(true);
      const { account, options } = props;

      try {
        await multisignatureAccountsRepository
          ?.addSignatoryAccount(account)
          .finally(() => {
            options?.onSuccess?.(account);
            multisignatureSelectedRepository.saveAccount(account.address);
          });

        return account;
      } catch (err) {
        const errorFormated = customReportError(err);
        setError(errorFormated);
        options?.onFallback?.(errorFormated);
      } finally {
        setIsLoading(false);
      }
    },
    [multisignatureAccountsRepository, multisignatureSelectedRepository]
  );

  return { save, isLoading, error };
}
