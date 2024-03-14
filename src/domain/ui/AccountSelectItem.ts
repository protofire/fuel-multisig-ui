import { toB256 } from "fuels";

export interface AccountAddress {
  hex: string; // 256 bit hash string
  formatted: string; // bech32Address
}

export interface AccountWalletItem {
  address: AccountAddress;
  name?: string;
  walletLogoUrl?: string;
}

export function toAccountSelect(
  defaultAddress: `fuel${string}`,
  walletLogoUrl: string,
  name?: string
): AccountWalletItem {
  const hex = toB256(defaultAddress);

  return {
    address: { formatted: defaultAddress, hex },
    ...(name ? { name } : null),
    walletLogoUrl,
  };
}
