import { assetByContractId } from "@/config/assetsMap";
import { TX_TYPE_IMG } from "@/config/images";
import { TransactionOutput } from "@/services/contracts/multisig/contracts/FuelMultisigAbi";
import {
  irregularToDecimalFormatted,
  tai64ToDate,
} from "@/utils/bnJsFormatter";

export interface TransferProposed {
  id: string;
  to: string | undefined;
  validUntil: Date;
  typeName: "Transfer" | "Call";
  assetAddress: string | undefined;
  assetValue: string | undefined;
  assetDecimals: number;
  valueAmount: string | undefined;
}

export interface TransactionDisplayInfo extends TransferProposed {
  image: string;
  txMsg: string;
}

export const emptyDisplayInfo = {
  image: TX_TYPE_IMG.CONTRACT,
  txMsg: "to",
};

export function toTxQueueItem(
  transactionOutput: TransactionOutput
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
      : "-";
  }

  const _result = {
    ...transfer,
    id: transactionOutput.tx_id.toString(),
    to: transactionOutput.to.Address?.value,
    validUntil: tai64ToDate(transactionOutput.valid_until),
  };

  return _result;
}