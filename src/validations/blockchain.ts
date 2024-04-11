import { isB256, isBech32 } from "fuels";

export function isValidAddress(address: string): string | undefined {
  const error = "Invalid address format";

  if (isBech32(address)) {
    return;
  } else if (isB256(address)) {
    return;
  }

  return error;
}
