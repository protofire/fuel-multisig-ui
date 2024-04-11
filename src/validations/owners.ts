import { Owner } from "@/domain/MultisignatureAccount";
import { toB256 } from "@/services/fuel/transformers/address";

import { isValidAddress } from "./blockchain";

export const validateOwners = (owner: Owner[]): string | void => {
  let error = "";
  const _owner = Array.isArray(owner) ? owner[0] : owner;

  if (_owner.name && !_owner.address) {
    error = "address should be provided complete";
  } else if (!_owner.name && _owner.address) {
    error = "name should be provided complete";
  } else if (isValidAddress(_owner.address)) {
    error = "address should be valid";
  }

  if (error) return error;
};

export const isAddressDuplicated = (
  address: string,
  index: number,
  allAddresses: Owner[]
) => {
  const exists =
    allAddresses.filter((item, idx) => {
      return toB256(item.address) === toB256(address) && index !== idx;
    }).length >= 1;

  if (exists) {
    return "Address owner must be unique";
  }
};
