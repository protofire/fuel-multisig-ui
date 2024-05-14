import { useQuery } from "@tanstack/react-query";

import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import { AccountWalletItem } from "@/domain/ui/AccountSelectItem";
import { toAccountWalletItem } from "@/services/fuel/connectors/transformer";

interface Props {
  owners: MultisignatureAccount["owners"];
  accountWalletItemConnected: AccountWalletItem | undefined;
}

const YOU_TEXT = "You 🫵 ";

export function useManageOwnersUi({
  owners,
  accountWalletItemConnected,
}: Props) {
  const ownersQuery = useQuery({
    queryKey: ["useManageOwners", owners, accountWalletItemConnected],
    initialData: [],
    queryFn: () => {
      if (!accountWalletItemConnected) return [];

      return owners.map((_o) => {
        const ownerAccount = toAccountWalletItem(_o.address, _o.name);
        const isYou =
          accountWalletItemConnected.address.b256 === ownerAccount.address.b256;

        return {
          ...ownerAccount,
          name: isYou
            ? `${ownerAccount.name} (${YOU_TEXT})`
            : ownerAccount.name,
          isYou,
        };
      });
    },
    enabled: !!accountWalletItemConnected,
  });

  return {
    ownersQuery,
  };
}
