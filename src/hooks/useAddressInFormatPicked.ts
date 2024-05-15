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
  b256Format?: boolean;
}

interface UseToggleAddressFormatReturn {
  addressFormatted: string;
  isB256Activated: FormatAccountWalletItemState["isB256Activated"];
}

export function useAddressInFormatPicked({
  accountWallet,
  b256Format,
}: Props): UseToggleAddressFormatReturn {
  const { isB256Activated } = useFormatAccountWalletItem();

  const _isB256Activated =
    b256Format !== undefined ? b256Format : isB256Activated;

  const addressFormatted = useMemo(() => {
    if (accountWallet === undefined) return "";

    const _accountWallet = isAccountWalletItem(accountWallet)
      ? accountWallet
      : toAccountWalletItem(accountWallet);

    return _isB256Activated
      ? _accountWallet.address.b256
      : _accountWallet.address.bech32;
  }, [_isB256Activated, accountWallet]);

  return {
    addressFormatted,
    isB256Activated,
  };
}
