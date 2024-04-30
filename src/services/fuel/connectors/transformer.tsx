import { FuelConnector, isBech32, toB256, toBech32 } from "fuels";

import {
  AccountAddress,
  AccountWalletItem,
} from "@/domain/ui/AccountSelectItem";
import { WalletProviderItem } from "@/domain/ui/WalletProviderItem";

export function getAccountWallet(walletAddress: string): AccountAddress {
  const b256 = isBech32(walletAddress)
    ? toB256(walletAddress as `fuel${string}`)
    : walletAddress;

  const bech32 = isBech32(walletAddress)
    ? walletAddress
    : toBech32(walletAddress);

  return {
    bech32,
    b256,
  };
}

export function getHexFromAddress(address: string) {
  return getAccountWallet(address).b256;
}

export function toAccountWalletItem(
  defaultAddress: string,
  name?: string
): AccountWalletItem {
  const accountWallet = getAccountWallet(defaultAddress);

  return {
    address: accountWallet,
    ...(name ? { name } : null),
  };
}

function extractDarkImage(
  image: FuelConnector["metadata"]["image"]
): string | null {
  if (typeof image === "object" && image !== null) {
    return image.dark;
  }

  return image ?? null;
}

export function toWalletProvider(c: FuelConnector): WalletProviderItem {
  const image = extractDarkImage(c.metadata.image);

  return {
    id: c.name,
    name: c.name,
    installed: c.installed,
    logo: { src: image, alt: `Logo ${c.name}` },
    installUrl: c.metadata.install.link,
  };
}
