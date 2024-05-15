import { toB256 } from "@/services/fuel/transformers/address";

import { IdentityInput } from "../multisig/contracts/FuelMultisigAbi";

export function toIdentityInput(str: string): IdentityInput {
  const identityInput: IdentityInput = {
    Address: { value: toB256(str) },
  };

  return identityInput;
}

export function toIdentityContractIdInput(str: string): IdentityInput {
  const identityInput: IdentityInput = {
    ContractId: { value: toB256(str) },
  };

  return identityInput;
}

export function toIdentityInputs(strings: string[]): IdentityInput[] {
  return strings.map((str) => toIdentityInput(str));
}
