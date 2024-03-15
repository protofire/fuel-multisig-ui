import { Address, isBech32 } from "fuels";

export function toB256(address: string): string {
  if (address.length === 63 && isBech32(address)) {
    Address.fromString(address).toB256();
  }

  return "";
}
