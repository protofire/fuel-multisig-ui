import { DateTime } from "fuels";

import { TX_TYPE_IMG } from "@/config/images";
import { AccountAddress } from "@/domain/ui/AccountSelectItem";

import { Owner } from "./MultisignatureAccount";

export interface TransferProposed {
  id: string;
  to: AccountAddress | undefined;
  validUntil: DateTime;
  typeName: "Transfer" | "Call";
  assetAddress: string | undefined;
  assetValue: string | undefined;
  assetDecimals: number;
  valueAmount: string | undefined;
}

export const TX_OWNER_STATUS_TYPE = {
  APPROVED: "Approved",
  REJECTED: "Rejected",
  PENDING: "Pending",
};

export type SignerApprovalStatus = (keyof typeof TX_OWNER_STATUS_TYPE)[number];

export const TX_STATUS_TYPE = {
  PROPOSED: "PROPOSED",
  EXECUTED_SUCCESS: "EXECUTED_SUCCESS",
  EXECUTED_FAILURE: "EXECUTED_FAILURE",
  CANCELLED: "CANCELLED",
  READY_TO_EXECUTE: "READY_TO_EXECUTE",
};

export type TxStatusType = (keyof typeof TX_STATUS_TYPE)[number];

export interface OwnerWithAction extends Owner {
  status: SignerApprovalStatus;
}

export interface TransferDisplayInfo extends TransferProposed {
  image: string;
  txMsg: string;
  approvalCount?: number;
  rejectionCount?: number;
  signMathOperation?: "+" | "-" | "";
  status: TxStatusType;
  ownersWithAction: OwnerWithAction[];
}

export interface CallDisplayInfo extends TransferProposed {
  image: string;
  txMsg: string;
  approvalCount?: number;
  rejectionCount?: number;
  signMathOperation?: "+" | "-" | "";
  status: TxStatusType;
  ownersWithAction: OwnerWithAction[];
  selector: string;
  callData: string;
}

export const emptyDisplayInfo = {
  image: TX_TYPE_IMG.CONTRACT,
  txMsg: "to",
  signMathOperation: "",
  status: TX_STATUS_TYPE.PROPOSED,
};

// Type guard for TransferDisplayInfo
export function isTransferDisplayInfo(
  info: TransferDisplayInfo | CallDisplayInfo
): info is TransferDisplayInfo {
  return !("selector" in info && "callData" in info);
}

// Type guard for CallDisplayInfo
export function isCallDisplayInfo(
  info: TransferDisplayInfo | CallDisplayInfo
): info is CallDisplayInfo {
  return "selector" in info && "callData" in info;
}
