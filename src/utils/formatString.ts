/**
 * Truncates a given address or string to a specified length on both sides and adds ellipsis in the middle.
 *
 * @example
 * // returns "0x123...cdef"
 * truncateAddress("0x1234567890abcdef", 3);
 */
export const truncateAddress = (
  value: string | undefined,
  sideLength = 6
): string => {
  return value
    ? value.length > sideLength * 2
      ? `${value.substring(0, sideLength)}...${value.substring(
          value.length - sideLength
        )}`
      : value
    : "";
};

/**
 * Shortens a given name to a maximum number of characters. If the name is longer than the maximum,
 * it retains the first word in full and replaces subsequent words with their initial characters.
 *
 * @example
 * // returns "John D."
 * shortNameLonger("John Doe", 7);
 */
export const shortNameLonger = (name: string, maxCharacters = 11): string => {
  try {
    if (name.length <= maxCharacters) return name;
    const shortenedName = name
      .split(" ")
      .map((word, index) => (index === 0 ? word : word.charAt(0)))
      .join(" ");
    return `${shortenedName}`;
  } catch (e) {
    return name;
  }
};

export const formatThreshold = ({
  threshold,
  owners,
}: {
  threshold: number | undefined;
  owners: number | undefined;
}) => {
  return `${threshold || "-"} / ${owners || "-"}`;
};
