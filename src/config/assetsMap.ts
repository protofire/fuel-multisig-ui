import { AssetInfo } from "@/domain/AssetInfo";

export const BASE_ASSET_ID =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

export const assetsMap: Record<string, AssetInfo> = {
  [BASE_ASSET_ID]: {
    assetId: BASE_ASSET_ID,
    symbol: "ETH",
    decimals: 9,
    imageUrl: "https://cdn.fuel.network/assets/eth.svg",
    name: "Ethereum",
  },
};

export function assetByContractId(assetId: string): AssetInfo {
  if (assetId in assetsMap) {
    return assetsMap[assetId];
  }

  return {
    assetId: assetId,
    symbol: "UNKNOWN",
    decimals: 0,
    name: `Unknown_${assetId.slice(-5)}`,
  };
}
