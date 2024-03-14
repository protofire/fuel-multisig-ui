const unicodeRanges = [
  [0x1f600, 0x1f60e],
  [0x1f638, 0x1f63d],
  [0x1f680, 0x1f683],
  [0x2614, 0x2615],
  [0x1f330, 0x1f393],
  [0x1f3a0, 0x1f3ca],
  [0x1f400, 0x1f42a],
];

let totalEmojis = 0;
for (const range of unicodeRanges) {
  totalEmojis += range[1] - range[0] + 1;
}

export const addressToEmoji = (hexString: string): string => {
  const cleanHex = hexString.startsWith("0x") ? hexString.slice(2) : hexString;
  const slice = cleanHex.length > 12 ? cleanHex.slice(0, 12) : cleanHex;
  const decimal = BigInt(`0x${slice}`);
  let index = Number(decimal % BigInt(totalEmojis));

  for (const range of unicodeRanges) {
    if (index < range[1] - range[0] + 1) {
      return String.fromCodePoint(range[0] + index);
    } else {
      index -= range[1] - range[0] + 1;
    }
  }

  return "";
};
