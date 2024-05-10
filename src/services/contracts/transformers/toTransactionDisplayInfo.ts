import { DateTime } from "fuels";

import { assetByContractId } from "@/config/assetsMap";
import { TX_TYPE_IMG } from "@/config/images";
import {
  emptyDisplayInfo,
  TransactionDisplayInfo,
} from "@/domain/TransactionProposed";
import { TransactionDataOutput } from "@/services/contracts/multisig/contracts/FuelMultisigAbi";
import { getAccountWallet } from "@/services/fuel/connectors/transformer";
import { irregularToDecimalFormatted } from "@/utils/bnJsFormatter";

export function toTransactionDisplayInfo(
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
