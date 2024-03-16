export interface AccountAddress {
  hex: string; // 256 bit hash string
  formatted: string; // bech32Address
}

export interface AccountWalletItem {
  address: AccountAddress;
  name?: string;
  walletLogoUrl?: string;
}
