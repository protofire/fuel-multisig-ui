import { BN } from "fuels";

import { AssetInfo } from "@/domain/AssetInfo";

interface Options {
  significantFigures?: number;
  assetInfo?: AssetInfo;
}

// convert decimal to irregular unit e.g. 1.0000  to 1000000000000
export const irregularToDecimal = (
  amount: undefined | string | number | number[] | BN | Uint8Array | Buffer,
  options: Options
): number | undefined => {
  const { assetInfo } = options;
  const decimals = assetInfo?.decimals !== undefined ? assetInfo.decimals : 0;

  if (decimals === undefined || amount === undefined) return;

  const base = new BN(10).pow(new BN(decimals));
  const { div, mod } = new BN(amount).divmod(base);

  return parseFloat(
    `${div.toString()}.${mod.toString().padStart(decimals, "0")}`
  );
};

// convert irregular unit to decimal with token name (ETH)  e.g. 100000000000 to 1.0000 ETH
export const irregularToDecimalFormatted = (
  amount: undefined | string | number | number[] | BN | Uint8Array | Buffer,
  options: Options
): string | undefined => {
  const { assetInfo } = options;
  const decimalAmount = irregularToDecimal(amount, options);

  if (decimalAmount === undefined) {
    return;
  }

  const formattedVal =
    options?.significantFigures === undefined
      ? decimalAmount.toString()
      : decimalAmount.toFixed(options?.significantFigures).toString();

  const symbol = assetInfo?.symbol ? assetInfo.symbol : "";

  return `${formattedVal} ${symbol}`;
};

// convert decimal to irregular unit e.g. 1.0000  to 1000000000000
export const decimalToIrregular = (
  amount: number,
  options: Options | undefined
): bigint | undefined => {
  const decimals = options?.assetInfo?.decimals || 0;
  if (!decimals) return;

  const convertedValue = BigInt(amount * 10 ** decimals);

  return convertedValue;
};

/**
 * Converts a TAI64 timestamp (BN object) to a JavaScript Date object.
 */
export function tai64ToDate(tai64: BN): Date {
  // TAI64 to UNIX: Adjust to align TAI64 with the Unix epoch
  const adjustment = new BN("9223372036854775808"); // 0x8000000000000000
  const nanosecondsPerMillisecond = new BN(1000000);

  const tai64BigInt = BigInt(tai64.toString());

  // Adjust TAI64 and convert from nanoseconds to milliseconds
  const unixTimestampMillis =
    (tai64BigInt - BigInt(adjustment.toString())) /
    BigInt(nanosecondsPerMillisecond.toString());

  // Convert from milliseconds to seconds for the Date constructor that expects milliseconds since the Unix epoch
  return new Date(Number(unixTimestampMillis) * 1000);
}
