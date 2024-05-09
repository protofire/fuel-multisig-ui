import { DateTime } from "fuels";

import { assetByContractId } from "@/config/assetsMap";
import { TX_TYPE_IMG } from "@/config/images";
import { AccountAddress } from "@/domain/ui/AccountSelectItem";
import { TransactionDataOutput } from "@/services/contracts/multisig/contracts/FuelMultisigAbi";
import { getAccountWallet } from "@/services/fuel/connectors/transformer";
import { irregularToDecimalFormatted } from "@/utils/bnJsFormatter";

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

export type TX_STATUS_TYPE =
  | "PROPOSED"
  | "READY_TO_EXECUTE"
  | "EXECUTED_SUCCESS"
  | "EXECUTED_FAILURE"
  | "CANCELLED";

export interface TransactionDisplayInfo extends TransferProposed {
  image: string;
  txMsg: string;
  approvalCount?: number;
  rejectionCount?: number;
  signMathOperation?: "+" | "-" | "";
  status: TX_STATUS_TYPE;
}

export const emptyDisplayInfo = {
  image: TX_TYPE_IMG.CONTRACT,
  txMsg: "to",
  signMathOperation: "",
  status: "PROPOSED",
};

export function toTxQueueItem(
  transactionOutput: TransactionDataOutput,
  threshold: number
): TransactionDisplayInfo {
  const transfer = { ...emptyDisplayInfo } as TransactionDisplayInfo;

  if ("Transfer" in transactionOutput.tx_parameters) {
    transfer.typeName = "Transfer";
    transfer.assetAddress =
      transactionOutput.tx_parameters.Transfer?.asset_id.value;
    transfer.assetValue =
      transactionOutput.tx_parameters.Transfer?.value?.toString();
    transfer.assetDecimals = 0;
    transfer.image = TX_TYPE_IMG.SEND;
    transfer.valueAmount = transfer.assetAddress
      ? irregularToDecimalFormatted(
          transactionOutput.tx_parameters.Transfer?.value,
          {
            significantFigures: 4,
            assetInfo: assetByContractId(transfer.assetAddress, {
              decimals: transfer.assetDecimals,
            }),
          }
        )
      : "";
    transfer.signMathOperation = "-";
  }

  const _result = {
    ...transfer,
    status:
      transactionOutput.approvals_count >= threshold
        ? "READY_TO_EXECUTE"
        : transfer.status,
    id: transactionOutput.tx_id.toString(),
    to: transactionOutput.to.Address
      ? getAccountWallet(transactionOutput.to.Address.value)
      : undefined,
    validUntil: DateTime.fromTai64(transactionOutput.valid_until.toString()),
    approvalCount: transactionOutput.approvals_count,
    rejectionCount: transactionOutput.rejections_count,
  };

  return _result;
}
