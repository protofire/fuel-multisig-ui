import { Owner } from "@/domain/MultisignatureAccount";
import { toB256 } from "@/services/fuel/transformers/address";

import { validateAddress } from "./blockchain";

export const validateOwners = (owner: Owner[]): string | void => {
  let error = "";
  const _owner = Array.isArray(owner) ? owner[0] : owner;

  if (_owner.name && !_owner.address) {
    error = "address should be provided complete";
  } else if (!_owner.name && _owner.address) {
    error = "name should be provided complete";
  } else if (validateAddress(_owner.address)) {
    error = "address should be valid";
  }

  if (error) return error;
};

/**
 * Validates whether an address is unique within a list of addresses.
 *
 * This function checks if the given address is already present in the list of owners,
 * ignoring the address at the provided index (useful for validation during updates).
 */
type AddressObject = {
  address: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & Record<string, any>;
export const isAddressDuplicated = (
  address: string,
  allAddresses: AddressObject[],
  index?: number
): string | undefined => {
  const isDuplicated = allAddresses.some((item, idx) => {
    return toB256(item.address) === toB256(address) && index !== idx;
  });

  if (isDuplicated) {
    return "Address owner must be unique";
  }

  return undefined;
};
