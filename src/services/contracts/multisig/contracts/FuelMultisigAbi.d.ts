/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.89.2
  Forc version: 0.60.0
  Fuel-Core version: 0.27.0
*/

import type {
  BigNumberish,
  BN,
  Bytes,
  BytesLike,
  Contract,
  DecodedValue,
  FunctionFragment,
  Interface,
  InvokeFunction,
} from 'fuels';

import type { Option, Enum, Vec } from "./common";

export type IdentityInput = Enum<{ Address: AddressInput, ContractId: ContractIdInput }>;
export type IdentityOutput = Enum<{ Address: AddressOutput, ContractId: ContractIdOutput }>;
export enum MultisigErrorInput { MaxOwnersReached = 'MaxOwnersReached', AlreadyOwner = 'AlreadyOwner', NotOwner = 'NotOwner', DuplicatedOwner = 'DuplicatedOwner', OwnersCannotBeEmpty = 'OwnersCannotBeEmpty', ThresholdCannotBeZero = 'ThresholdCannotBeZero', ThresholdCannotBeGreaterThanOwners = 'ThresholdCannotBeGreaterThanOwners', ThresholdNotReached = 'ThresholdNotReached', TransactionStillValid = 'TransactionStillValid', AlreadyVoted = 'AlreadyVoted', InvalidTxId = 'InvalidTxId', Unauthorized = 'Unauthorized', NotInitialized = 'NotInitialized', AlreadyInitialized = 'AlreadyInitialized', InsufficientAssetAmount = 'InsufficientAssetAmount', CanOnlyCallContracts = 'CanOnlyCallContracts', TransferRequiresAValue = 'TransferRequiresAValue', TransactionExpired = 'TransactionExpired', MaxTransactionsReached = 'MaxTransactionsReached' };
export enum MultisigErrorOutput { MaxOwnersReached = 'MaxOwnersReached', AlreadyOwner = 'AlreadyOwner', NotOwner = 'NotOwner', DuplicatedOwner = 'DuplicatedOwner', OwnersCannotBeEmpty = 'OwnersCannotBeEmpty', ThresholdCannotBeZero = 'ThresholdCannotBeZero', ThresholdCannotBeGreaterThanOwners = 'ThresholdCannotBeGreaterThanOwners', ThresholdNotReached = 'ThresholdNotReached', TransactionStillValid = 'TransactionStillValid', AlreadyVoted = 'AlreadyVoted', InvalidTxId = 'InvalidTxId', Unauthorized = 'Unauthorized', NotInitialized = 'NotInitialized', AlreadyInitialized = 'AlreadyInitialized', InsufficientAssetAmount = 'InsufficientAssetAmount', CanOnlyCallContracts = 'CanOnlyCallContracts', TransferRequiresAValue = 'TransferRequiresAValue', TransactionExpired = 'TransactionExpired', MaxTransactionsReached = 'MaxTransactionsReached' };
export type TransactionParametersInput = Enum<{ Call: ContractCallParamsInput, Transfer: TransferParamsInput }>;
export type TransactionParametersOutput = Enum<{ Call: ContractCallParamsOutput, Transfer: TransferParamsOutput }>;

export type AddressInput = { bits: string };
export type AddressOutput = AddressInput;
export type AssetIdInput = { bits: string };
export type AssetIdOutput = AssetIdInput;
export type ContractCallParamsInput = { calldata: Bytes, forwarded_gas: BigNumberish, function_selector: Bytes, single_value_type_arg: boolean, transfer_params: TransferParamsInput };
export type ContractCallParamsOutput = { calldata: Bytes, forwarded_gas: BN, function_selector: Bytes, single_value_type_arg: boolean, transfer_params: TransferParamsOutput };
export type ContractIdInput = { bits: string };
export type ContractIdOutput = ContractIdInput;
export type MultisigInitializedInput = { contract_id: ContractIdInput, threshold: BigNumberish, owners: Vec<IdentityInput> };
export type MultisigInitializedOutput = { contract_id: ContractIdOutput, threshold: number, owners: Vec<IdentityOutput> };
export type OwnerAddedInput = { owner: IdentityInput };
export type OwnerAddedOutput = { owner: IdentityOutput };
export type OwnerRemovedInput = { owner: IdentityInput };
export type OwnerRemovedOutput = { owner: IdentityOutput };
export type ThresholdChangedInput = { new_threshold: BigNumberish };
export type ThresholdChangedOutput = { new_threshold: number };
export type TransactionApprovedInput = { tx_id: BigNumberish, owner: IdentityInput };
export type TransactionApprovedOutput = { tx_id: BN, owner: IdentityOutput };
export type TransactionCancelledInput = { tx_id: BigNumberish };
export type TransactionCancelledOutput = { tx_id: BN };
export type TransactionDataInput = { tx_id: BigNumberish, to: IdentityInput, valid_until: BigNumberish, tx_parameters: TransactionParametersInput, approvals_count: BigNumberish, rejections_count: BigNumberish };
export type TransactionDataOutput = { tx_id: BN, to: IdentityOutput, valid_until: BN, tx_parameters: TransactionParametersOutput, approvals_count: number, rejections_count: number };
export type TransactionExecutedInput = { tx_id: BigNumberish };
export type TransactionExecutedOutput = { tx_id: BN };
export type TransactionProposedInput = { tx_id: BigNumberish, to: IdentityInput, transaction_parameters: TransactionParametersInput };
export type TransactionProposedOutput = { tx_id: BN, to: IdentityOutput, transaction_parameters: TransactionParametersOutput };
export type TransactionRejectedInput = { tx_id: BigNumberish, owner: IdentityInput };
export type TransactionRejectedOutput = { tx_id: BN, owner: IdentityOutput };
export type TransactionRemovedInput = { tx_id: BigNumberish };
export type TransactionRemovedOutput = { tx_id: BN };
export type TransferParamsInput = { asset_id: AssetIdInput, value: Option<BigNumberish> };
export type TransferParamsOutput = { asset_id: AssetIdOutput, value: Option<BN> };

interface FuelMultisigAbiInterface extends Interface {
  functions: {
    add_owner: FunctionFragment;
    approve_tx: FunctionFragment;
    change_threshold: FunctionFragment;
    constructor: FunctionFragment;
    execute_tx: FunctionFragment;
    propose_tx: FunctionFragment;
    reject_tx: FunctionFragment;
    remove_owner: FunctionFragment;
    remove_tx: FunctionFragment;
    get_active_tx_ids: FunctionFragment;
    get_next_tx_id: FunctionFragment;
    get_owners: FunctionFragment;
    get_threshold: FunctionFragment;
    get_tx: FunctionFragment;
    get_tx_approval_by_owner: FunctionFragment;
    is_owner: FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'add_owner', values: [IdentityInput]): Uint8Array;
  encodeFunctionData(functionFragment: 'approve_tx', values: [BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: 'change_threshold', values: [BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: 'constructor', values: [BigNumberish, Vec<IdentityInput>]): Uint8Array;
  encodeFunctionData(functionFragment: 'execute_tx', values: [BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: 'propose_tx', values: [IdentityInput, BigNumberish, TransactionParametersInput]): Uint8Array;
  encodeFunctionData(functionFragment: 'reject_tx', values: [BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: 'remove_owner', values: [IdentityInput]): Uint8Array;
  encodeFunctionData(functionFragment: 'remove_tx', values: [BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: 'get_active_tx_ids', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'get_next_tx_id', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'get_owners', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'get_threshold', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'get_tx', values: [BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: 'get_tx_approval_by_owner', values: [BigNumberish, IdentityInput]): Uint8Array;
  encodeFunctionData(functionFragment: 'is_owner', values: [IdentityInput]): Uint8Array;

  decodeFunctionData(functionFragment: 'add_owner', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'approve_tx', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'change_threshold', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'constructor', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'execute_tx', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'propose_tx', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'reject_tx', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'remove_owner', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'remove_tx', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'get_active_tx_ids', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'get_next_tx_id', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'get_owners', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'get_threshold', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'get_tx', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'get_tx_approval_by_owner', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'is_owner', data: BytesLike): DecodedValue;
}

export class FuelMultisigAbi extends Contract {
  interface: FuelMultisigAbiInterface;
  functions: {
    add_owner: InvokeFunction<[owner: IdentityInput], void>;
    approve_tx: InvokeFunction<[tx_id: BigNumberish], void>;
    change_threshold: InvokeFunction<[threshold: BigNumberish], void>;
    constructor: InvokeFunction<[threshold: BigNumberish, owners_list: Vec<IdentityInput>], void>;
    execute_tx: InvokeFunction<[tx_id: BigNumberish], void>;
    propose_tx: InvokeFunction<[to: IdentityInput, tx_validity_duration: BigNumberish, tx_parameters: TransactionParametersInput], BN>;
    reject_tx: InvokeFunction<[tx_id: BigNumberish], void>;
    remove_owner: InvokeFunction<[owner: IdentityInput], void>;
    remove_tx: InvokeFunction<[tx_id: BigNumberish], void>;
    get_active_tx_ids: InvokeFunction<[], Vec<BN>>;
    get_next_tx_id: InvokeFunction<[], BN>;
    get_owners: InvokeFunction<[], Vec<IdentityOutput>>;
    get_threshold: InvokeFunction<[], number>;
    get_tx: InvokeFunction<[tx_id: BigNumberish], Option<TransactionDataOutput>>;
    get_tx_approval_by_owner: InvokeFunction<[tx_id: BigNumberish, owner: IdentityInput], Option<boolean>>;
    is_owner: InvokeFunction<[owner: IdentityInput], boolean>;
  };
}
