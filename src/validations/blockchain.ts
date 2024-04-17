import { isB256, isBech32 } from "fuels";

export function validateAddress(address: string): string | undefined {
  const error = "Invalid address format";

  try {
    if (address.length === 63 && isBech32(address)) {
      return;
    } else if (isB256(address)) {
      return;
    }
  } catch (e) {
    console.error(e);
  }

  return error;
}
