/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.81.0
  Forc version: 0.49.3
  Fuel-Core version: 0.22.1
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
export type InternalTransactionParametersInput = Enum<{ Call: InternalContractCallParamsInput, Transfer: TransferParamsInput }>;
export type InternalTransactionParametersOutput = Enum<{ Call: InternalContractCallParamsOutput, Transfer: TransferParamsOutput }>;
export enum MultisigErrorInput { MaxOwnersReached = 'MaxOwnersReached', AlreadyOwner = 'AlreadyOwner', NotOwner = 'NotOwner', DuplicatedOwner = 'DuplicatedOwner', OwnersCannotBeEmpty = 'OwnersCannotBeEmpty', ThresholdCannotBeZero = 'ThresholdCannotBeZero', ThresholdCannotBeGreaterThanOwners = 'ThresholdCannotBeGreaterThanOwners', ThresholdNotReached = 'ThresholdNotReached', TransactionStillValid = 'TransactionStillValid', AlreadyVoted = 'AlreadyVoted', InvalidTxId = 'InvalidTxId', Unauthorized = 'Unauthorized', NotInitialized = 'NotInitialized', AlreadyInitialized = 'AlreadyInitialized', InsufficientAssetAmount = 'InsufficientAssetAmount', CanOnlyCallContracts = 'CanOnlyCallContracts', TransferRequiresAValue = 'TransferRequiresAValue', TransactionExpired = 'TransactionExpired', MaxTransactionsReached = 'MaxTransactionsReached' };
export enum MultisigErrorOutput { MaxOwnersReached = 'MaxOwnersReached', AlreadyOwner = 'AlreadyOwner', NotOwner = 'NotOwner', DuplicatedOwner = 'DuplicatedOwner', OwnersCannotBeEmpty = 'OwnersCannotBeEmpty', ThresholdCannotBeZero = 'ThresholdCannotBeZero', ThresholdCannotBeGreaterThanOwners = 'ThresholdCannotBeGreaterThanOwners', ThresholdNotReached = 'ThresholdNotReached', TransactionStillValid = 'TransactionStillValid', AlreadyVoted = 'AlreadyVoted', InvalidTxId = 'InvalidTxId', Unauthorized = 'Unauthorized', NotInitialized = 'NotInitialized', AlreadyInitialized = 'AlreadyInitialized', InsufficientAssetAmount = 'InsufficientAssetAmount', CanOnlyCallContracts = 'CanOnlyCallContracts', TransferRequiresAValue = 'TransferRequiresAValue', TransactionExpired = 'TransactionExpired', MaxTransactionsReached = 'MaxTransactionsReached' };
export type TransactionParametersInput = Enum<{ Call: ContractCallParamsInput, Transfer: TransferParamsInput }>;
export type TransactionParametersOutput = Enum<{ Call: ContractCallParamsOutput, Transfer: TransferParamsOutput }>;

export type AddressInput = { value: string };
export type AddressOutput = AddressInput;
export type AssetIdInput = { value: string };
export type AssetIdOutput = AssetIdInput;
export type ContractCallParamsInput = { calldata: Bytes, forwarded_gas: BigNumberish, function_selector: Bytes, single_value_type_arg: boolean, transfer_params: TransferParamsInput };
export type ContractCallParamsOutput = { calldata: Bytes, forwarded_gas: BN, function_selector: Bytes, single_value_type_arg: boolean, transfer_params: TransferParamsOutput };
export type ContractIdInput = { value: string };
export type ContractIdOutput = ContractIdInput;
export type InternalContractCallParamsInput = { forwarded_gas: BigNumberish, single_value_type_arg: boolean, transfer_params: TransferParamsInput };
export type InternalContractCallParamsOutput = { forwarded_gas: BN, single_value_type_arg: boolean, transfer_params: TransferParamsOutput };
export type MultisigInitializedInput = { contract_id: ContractIdInput, threshold: BigNumberish, owners: Vec<IdentityInput> };
export type MultisigInitializedOutput = { contract_id: ContractIdOutput, threshold: number, owners: Vec<IdentityOutput> };
export type OwnerAddedInput = { owner: IdentityInput };
export type OwnerAddedOutput = { owner: IdentityOutput };
export type RawBytesInput = { ptr: BigNumberish, cap: BigNumberish };
export type RawBytesOutput = { ptr: BN, cap: BN };
export type ThresholdChangedInput = { new_threshold: BigNumberish };
export type ThresholdChangedOutput = { new_threshold: number };
export type TransactionInput = { tx_id: BigNumberish, to: IdentityInput, valid_until: BigNumberish, tx_parameters: InternalTransactionParametersInput };
export type TransactionOutput = { tx_id: BN, to: IdentityOutput, valid_until: BN, tx_parameters: InternalTransactionParametersOutput };
export type TransactionApprovedInput = { tx_id: BigNumberish, owner: IdentityInput };
export type TransactionApprovedOutput = { tx_id: BN, owner: IdentityOutput };
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
    get_tx_approval_count: FunctionFragment;
    get_tx_calldata: FunctionFragment;
    get_tx_function_selector: FunctionFragment;
    get_tx_rejection_count: FunctionFragment;
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
  encodeFunctionData(functionFragment: 'get_tx_approval_count', values: [BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: 'get_tx_calldata', values: [BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: 'get_tx_function_selector', values: [BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: 'get_tx_rejection_count', values: [BigNumberish]): Uint8Array;
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
  decodeFunctionData(functionFragment: 'get_tx_approval_count', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'get_tx_calldata', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'get_tx_function_selector', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'get_tx_rejection_count', data: BytesLike): DecodedValue;
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
    get_tx: InvokeFunction<[tx_id: BigNumberish], Option<TransactionOutput>>;
    get_tx_approval_by_owner: InvokeFunction<[tx_id: BigNumberish, owner: IdentityInput], Option<boolean>>;
    get_tx_approval_count: InvokeFunction<[tx_id: BigNumberish], Option<number>>;
    get_tx_calldata: InvokeFunction<[tx_id: BigNumberish], Option<Bytes>>;
    get_tx_function_selector: InvokeFunction<[tx_id: BigNumberish], Option<Bytes>>;
    get_tx_rejection_count: InvokeFunction<[tx_id: BigNumberish], Option<number>>;
    is_owner: InvokeFunction<[owner: IdentityInput], boolean>;
  };
}
