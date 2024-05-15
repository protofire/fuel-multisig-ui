import { DateTime } from "fuels";

import { assetByContractId } from "@/config/assetsMap";
import { TX_TYPE_IMG } from "@/config/images";
import {
  CallDisplayInfo,
  emptyDisplayInfo,
  TransferDisplayInfo,
} from "@/domain/TransactionProposed";
import { TransactionDataOutput } from "@/services/contracts/multisig/contracts/FuelMultisigAbi";
import { getAccountWallet } from "@/services/fuel/connectors/transformer";
import { irregularToDecimalFormatted } from "@/utils/bnJsFormatter";

export function toTransactionDisplayInfo(
  transactionOutput: TransactionDataOutput,
  threshold: number
): TransferDisplayInfo | CallDisplayInfo {
  if ("Transfer" in transactionOutput.tx_parameters) {
    const transferTransaction = { ...emptyDisplayInfo } as TransferDisplayInfo;
    transferTransaction.typeName = "Transfer";
    transferTransaction.assetAddress =
      transactionOutput.tx_parameters.Transfer?.asset_id.value;
    transferTransaction.assetValue =
      transactionOutput.tx_parameters.Transfer?.value?.toString();
    transferTransaction.assetDecimals = 0;
    transferTransaction.image = TX_TYPE_IMG.SEND;
    transferTransaction.valueAmount = transferTransaction.assetAddress
      ? irregularToDecimalFormatted(
          transactionOutput.tx_parameters.Transfer?.value,
          {
            significantFigures: 4,
            assetInfo: assetByContractId(transferTransaction.assetAddress, {
              decimals: transferTransaction.assetDecimals,
            }),
          }
        )
      : "";
    transferTransaction.signMathOperation = "-";

    const _result = {
      ...transferTransaction,
      status:
        transactionOutput.approvals_count >= threshold
          ? "READY_TO_EXECUTE"
          : transferTransaction.status,
      id: transactionOutput.tx_id.toString(),
      to: transactionOutput.to.Address
        ? getAccountWallet(transactionOutput.to.Address.value)
        : undefined,
      validUntil: DateTime.fromTai64(transactionOutput.valid_until.toString()),
      approvalCount: transactionOutput.approvals_count,
      rejectionCount: transactionOutput.rejections_count,
    };

    return _result;
  } else {
    const callTransaction = { ...emptyDisplayInfo } as CallDisplayInfo;
    callTransaction.typeName = "Call";
    callTransaction.assetAddress =
      transactionOutput.tx_parameters.Call.transfer_params.asset_id.value;
    callTransaction.assetValue =
      transactionOutput.tx_parameters.Call.transfer_params.value?.toString();
    callTransaction.assetDecimals = 0;
    callTransaction.image = TX_TYPE_IMG.CONTRACT;
    callTransaction.valueAmount = callTransaction.assetAddress
      ? irregularToDecimalFormatted(
          transactionOutput.tx_parameters.Call.transfer_params.value,
          {
            significantFigures: 4,
            assetInfo: assetByContractId(callTransaction.assetAddress, {
              decimals: callTransaction.assetDecimals,
            }),
          }
        )
      : "";
    callTransaction.signMathOperation = "-";
    callTransaction.selector =
      transactionOutput.tx_parameters.Call.function_selector.toString();
    callTransaction.callData =
      transactionOutput.tx_parameters.Call.calldata.toString();
      debugger;

    const _result = {
      ...callTransaction,
      status:
        transactionOutput.approvals_count >= threshold
          ? "READY_TO_EXECUTE"
          : callTransaction.status,
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
}
