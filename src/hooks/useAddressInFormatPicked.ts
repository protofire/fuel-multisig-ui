import { useMemo } from "react";

import { FormatAccountWalletItemState } from "@/context/FormatAccountWalletItem";
import { useFormatAccountWalletItem } from "@/context/FormatAccountWalletItem/useFormatAccountWalletItem";
import {
  AccountWalletItem,
  isAccountWalletItem,
} from "@/domain/ui/AccountSelectItem";
import { toAccountWalletItem } from "@/services/fuel/connectors/transformer";

interface Props {
  accountWallet: AccountWalletItem | string | undefined;
}

interface UseToggleAddressFormatReturn {
  addressFormatted: string;
  isB256Activated: FormatAccountWalletItemState["isB256Activated"];
}

export function useAddressInFormatPicked({
  accountWallet,
}: Props): UseToggleAddressFormatReturn {
  const { isB256Activated } = useFormatAccountWalletItem();

  const addressFormatted = useMemo(() => {
    if (accountWallet === undefined) return "";

    const _accountWallet = isAccountWalletItem(accountWallet)
      ? accountWallet
      : toAccountWalletItem(accountWallet);

    return isB256Activated
      ? _accountWallet.address.b256
      : _accountWallet.address.bech32;
  }, [accountWallet, isB256Activated]);

  return {
    addressFormatted,
    isB256Activated,
  };
}
