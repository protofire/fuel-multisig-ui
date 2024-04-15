import { CoinQuantity } from "fuels";

import { AssetInfo } from "../AssetInfo";

export interface AssetAmount extends Pick<CoinQuantity, "amount">, AssetInfo {
  amountFormatted: string;
}
