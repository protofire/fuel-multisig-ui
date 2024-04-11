export interface AssetInfo {
  assetId: string;
  name?: string;
  symbol?: string;
  imageUrl?: string;
  decimals?: number;
}

export const BASE_ASSET_ID =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

export const assetsMap: Record<string, AssetInfo> = {
  [BASE_ASSET_ID]: {
    assetId: BASE_ASSET_ID,
    symbol: "ETH",
    decimals: 9,
  },
};
