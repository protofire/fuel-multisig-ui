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

export type SignerApprovalStatus = "Pending" | "Approved" | "Rejected";

export const TX_STATUS_TYPE = {
  PROPOSED: "PROPOSED",
  EXECUTED_SUCCESS: "EXECUTED_SUCCESS",
  EXECUTED_FAILURE: "EXECUTED_FAILURE",
  CANCELLED: "CANCELLED",
};

export type TxStatusType = (keyof typeof TX_STATUS_TYPE)[number];

export interface OwnerWithAction extends Owner {
  status: SignerApprovalStatus;
}

export interface TransactionDisplayInfo extends TransferProposed {
  image: string;
  txMsg: string;
  approvalCount?: number;
  rejectionCount?: number;
  signMathOperation?: "+" | "-" | "";
  status: TxStatusType;
  ownersWithAction: OwnerWithAction[];
}

export const emptyDisplayInfo = {
  image: TX_TYPE_IMG.CONTRACT,
  txMsg: "to",
  signMathOperation: "",
  status: TX_STATUS_TYPE.PROPOSED,
};
