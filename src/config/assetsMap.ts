import { AssetInfo } from "@/domain/AssetInfo";

export const baseAssetInfo = (_baseId: string): AssetInfo => ({
  assetId: _baseId,
  symbol: "ETH",
  decimals: 9,
  imageUrl: "https://cdn.fuel.network/assets/eth.svg",
  name: "Ethereum",
});

export const convertListToMap = (
  assets: AssetInfo[]
): Record<string, AssetInfo> => {
  return assets.reduce((map, asset) => {
    map[asset.assetId] = asset;
    return map;
  }, {} as Record<string, AssetInfo>);
};

export class AssetInfoFinder {
  public assetsMap: Record<string, AssetInfo>;
  public baseAssetInfo: AssetInfo;

  constructor(baseAssetId = "", assetsMap: AssetInfo[] = []) {
    this.baseAssetInfo = baseAssetInfo(baseAssetId);
    this.assetsMap = convertListToMap([this.baseAssetInfo].concat(assetsMap));
  }

  public byContractId(assetId: string, props?: Partial<AssetInfo>): AssetInfo {
    if (assetId in this.assetsMap) {
      return this.assetsMap[assetId];
    }

    return {
      assetId: assetId,
      symbol: "UNKNOWN",
      decimals: 0,
      name: `Unknown_${assetId.slice(-5)}`,
      ...props,
    };
  }
}
