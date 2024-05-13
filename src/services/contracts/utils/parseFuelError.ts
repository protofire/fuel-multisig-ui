import { getErrorMessage } from "@/utils/error";

// eslint-disable-next-line unused-imports/no-unused-vars
interface IFuelError {
  // expected prop in parseFuelError
  metadata?: { logs: string[] };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseFuelError(e: any): {
  log: string | null;
  message: string;
} {
  let log: null | string = null;
  let message: null | string = null;

  if (e.metadata && Array.isArray(e.metadata.logs) && e.metadata.logs.length) {
    for (const logEntry of e.metadata.logs) {
      if (typeof logEntry === "string") {
        log = logEntry;
        break;
      }
    }
  }

  message = e.message || getErrorMessage(e);

  return { log, message: message || "" };
}
