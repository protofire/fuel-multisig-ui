export interface AssetInfo {
  assetId: string;
  assetSymbol?: string;
  assetDecimals?: number;
}

export const BASE_ASSET_ID =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

export const assetsMap: Record<string, AssetInfo> = {
  [BASE_ASSET_ID]: {
    assetId: BASE_ASSET_ID,
    assetSymbol: "ETH",
    assetDecimals: 9,
  },
};
