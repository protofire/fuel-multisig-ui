import { toB256 } from "@/services/fuel/transformers/address";

import { IdentityInput } from "../multisig/contracts/FuelMultisigAbi";

export function toIdentityInput(strings: string[]): IdentityInput[] {
  return strings.map((str) => {
    const identityInput: IdentityInput = {
      Address: { value: toB256(str) },
    };
    return identityInput;
  });
}
