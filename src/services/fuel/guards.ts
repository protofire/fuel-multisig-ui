import {
  AddressInput,
  ContractIdInput,
  IdentityInput,
} from "../contracts/multisig/contracts/FuelMultisigAbi";

// Type guard for Address
export function isAddressInput(
  identity: IdentityInput
): identity is { Address: AddressInput } {
  return (identity as { Address: AddressInput }).Address !== undefined;
}

// Type guard for ContractId
export function isContractIdInput(
  identity: IdentityInput
): identity is { ContractId: ContractIdInput } {
  return (identity as { ContractId: ContractIdInput }).ContractId !== undefined;
}
