import { DateTime } from "fuels";

import { AssetInfoFinder } from "@/config/assetsMap";
import { TX_TYPE_IMG } from "@/config/images";
import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import {
  CallDisplayInfo,
  emptyDisplayInfo,
  TransferDisplayInfo,
} from "@/domain/TransactionProposed";
import { TransactionDataOutput } from "@/services/contracts/multisig/contracts/FuelMultisigAbi";
import { getAccountWallet } from "@/services/fuel/connectors/transformer";
import { irregularToDecimalFormatted } from "@/utils/bnJsFormatter";
import { bytes_to_hex } from "@/utils/formatString";

export function toTransactionDisplayInfo(
  transactionOutput: TransactionDataOutput,
  threshold: number,
  multisigSelected: MultisignatureAccount | undefined,
  assetInfoFinder: AssetInfoFinder
): TransferDisplayInfo | CallDisplayInfo {
  if ("Transfer" in transactionOutput.tx_parameters) {
    const transferTransaction = { ...emptyDisplayInfo } as TransferDisplayInfo;
    transferTransaction.typeName = "Transfer";
    transferTransaction.assetAddress =
      transactionOutput.tx_parameters.Transfer?.asset_id.bits;
    transferTransaction.assetValue =
      transactionOutput.tx_parameters.Transfer?.value?.toString();
    transferTransaction.assetDecimals = 0;
    transferTransaction.image = TX_TYPE_IMG.SEND;
    transferTransaction.valueAmount = transferTransaction.assetAddress
      ? irregularToDecimalFormatted(
          transactionOutput.tx_parameters.Transfer?.value,
          {
            significantFigures: 4,
            assetInfo: assetInfoFinder.byContractId(
              transferTransaction.assetAddress,
              {
                decimals: transferTransaction.assetDecimals,
              }
            ),
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
        ? getAccountWallet(transactionOutput.to.Address.bits)
        : getAccountWallet(transactionOutput.to.ContractId.bits),
      validUntil: DateTime.fromTai64(transactionOutput.valid_until.toString()),
      approvalCount: transactionOutput.approvals_count,
      rejectionCount: transactionOutput.rejections_count,
    };

    return _result;
  } else {
    const callTransaction = { ...emptyDisplayInfo } as CallDisplayInfo;

    if (transactionOutput.to.ContractId?.bits && multisigSelected?.address) {
      if (
        getAccountWallet(transactionOutput.to.ContractId?.bits).b256 ===
        getAccountWallet(multisigSelected.address).b256
      ) {
        callTransaction.typeName = "Settings";
        callTransaction.image = TX_TYPE_IMG.CONTRACT;
      } else {
        callTransaction.typeName = "Custom Contract";
        callTransaction.image = TX_TYPE_IMG.CONTRACT;
      }
    }

    callTransaction.assetAddress =
      transactionOutput.tx_parameters.Call.transfer_params.asset_id.bits;
    callTransaction.assetValue =
      transactionOutput.tx_parameters.Call.transfer_params.value?.toString();
    callTransaction.assetDecimals = 0;
    callTransaction.valueAmount = callTransaction.assetAddress
      ? irregularToDecimalFormatted(
          transactionOutput.tx_parameters.Call.transfer_params.value,
          {
            significantFigures: 4,
            assetInfo: assetInfoFinder.byContractId(
              callTransaction.assetAddress,
              {
                decimals: callTransaction.assetDecimals,
              }
            ),
          }
        )
      : "";
    callTransaction.signMathOperation = "-";
    callTransaction.selector = bytes_to_hex(
      transactionOutput.tx_parameters.Call.function_selector
    );
    callTransaction.callData = bytes_to_hex(
      transactionOutput.tx_parameters.Call.calldata
    );

    const _result = {
      ...callTransaction,
      status:
        transactionOutput.approvals_count >= threshold
          ? "READY_TO_EXECUTE"
          : callTransaction.status,
      id: transactionOutput.tx_id.toString(),
      to: transactionOutput.to.ContractId
        ? getAccountWallet(transactionOutput.to.ContractId.bits)
        : undefined,
      validUntil: DateTime.fromTai64(transactionOutput.valid_until.toString()),
      approvalCount: transactionOutput.approvals_count,
      rejectionCount: transactionOutput.rejections_count,
    };

    return _result;
  }
}
