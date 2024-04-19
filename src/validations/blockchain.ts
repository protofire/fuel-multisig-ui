import { isB256, isBech32 } from "fuels";

import { customReportError } from "@/utils/error";

export function validateAddress(address: string): string | undefined {
  const error = "Invalid address format";

  try {
    if (address.length === 63 && isBech32(address)) {
      return;
    } else if (isB256(address)) {
      return;
    }
  } catch (e) {
    customReportError(e);
  }

  return error;
}
