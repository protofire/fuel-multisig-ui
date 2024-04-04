import { FuelConnector, isBech32, toB256 } from "fuels";

import { AccountWalletItem } from "@/domain/ui/AccountSelectItem";
import { WalletProviderItem } from "@/domain/ui/WalletProviderItem";

export function toAccountWalletItem(
  defaultAddress: string,
  name?: string
): AccountWalletItem {
  const hex = isBech32(defaultAddress)
    ? toB256(defaultAddress as `fuel${string}`)
    : defaultAddress;

  return {
    address: { formatted: defaultAddress, hex },
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
