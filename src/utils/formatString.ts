/**
 * Truncates a given string to show only the first `startLength` characters and the last `endLength` characters,
 * with ellipsis in the middle if the string's length exceeds the sum of `startLength` and `endLength`.
 * If the string is shorter than the sum of `startLength` and `endLength`, it returns the original string.
 * Optionally, it can show ellipsis to indicate that the string is longer than the allowed limit.
 *
 * @param value The string to be truncated.
 * @param startLength The number of characters to show at the start of the string.
 * @param endLength The number of characters to show at the end of the string. Defaults to the same as `startLength` if not provided.
 * @param showEllipsis Indicates whether to show ellipsis (...) when the string is truncated. Defaults to true.
 * @returns The truncated string or the original string if its length is within the allowed limit.
 *
 * @example
 * // returns "0x123...cdef"
 * truncateAddress("0x1234567890abcdef", 3);
 *
 * @example
 * // returns "0x123456...7890abcdef"
 * truncateAddress("0x1234567890abcdef", 6, 6);
 *
 * @example
 * // returns "0x1234567890abcdef"
 * truncateAddress("0x1234567890abcdef", 10, 10, false);
 */
export const truncateAddress = (
  value: string | undefined,
  startLength = 6,
  endLength = 6,
  showEllipsis = true
): string => {
  if (!value) return "";
  const _endLength = endLength ?? startLength; // Use startLength if endLength is not provided
  const totalLength = startLength + _endLength;

  // Return the original value if it's shorter than the total length required to truncate
  if (value.length <= totalLength) return value;

  // Truncate the value if it's longer than the total length
  const start = value.substring(0, startLength);
  const end = value.substring(value.length - _endLength);
  return showEllipsis ? `${start}...${end}` : `${start}${end}`;
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

export const formatDate = (inputDate: Date) => {
  const date = new Date(inputDate);
  return date.toLocaleString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
