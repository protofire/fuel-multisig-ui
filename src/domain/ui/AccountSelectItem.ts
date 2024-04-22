export interface AccountAddress {
  b256: string; // 256 bit hash string
  bech32: string; // bech32Address
}

export interface AccountWalletItem {
  address: AccountAddress;
  name?: string;
  walletLogoUrl?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAccountWalletItem(obj: any): obj is AccountWalletItem {
  return (
    obj &&
    typeof obj === "object" &&
    obj.address &&
    typeof obj.address.b256 === "string" &&
    typeof obj.address.bech32 === "string"
  );
}
