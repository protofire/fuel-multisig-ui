import { useBalance } from "@fuels/react";
import { BN } from "fuels";
import { useEffect, useMemo, useRef, useState } from "react";

import { AssetInfoFinder, baseAssetInfo } from "@/config/assetsMap";
import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { AssetInfo } from "@/domain/AssetInfo";
import { irregularToDecimalFormatted } from "@/utils/bnJsFormatter";

interface UseGetBalanceReturn {
  balance: BN | null;
  assetInfo: AssetInfo;
  formatted: string | undefined;
  isLoading: boolean;
  addressToRequest?: string | undefined;
}

export function useAssetsInfoFinder() {
  const { wallet } = useNetworkConnection();
  const baseIdRef = useRef<string>("");
  const [assetInfoFinder, setAssetInfoFinder] = useState<AssetInfoFinder>(
    new AssetInfoFinder()
  );

  useEffect(() => {
    if (wallet && wallet.provider.getBaseAssetId() !== baseIdRef.current) {
      baseIdRef.current = wallet.provider.getBaseAssetId();
      setAssetInfoFinder(new AssetInfoFinder(baseIdRef.current));
    }
  }, [wallet]);

  return {
    assetInfoFinder,
    baseAssetId: baseIdRef.current,
  };
}

export function useGetBalance(
  _address?: string,
  assetInfoProps?: AssetInfo
): UseGetBalanceReturn {
  const { baseAssetId, assetInfoFinder } = useAssetsInfoFinder();
  const assetInfo = useMemo(
    () =>
      assetInfoProps?.assetId
        ? { ...assetInfoProps }
        : baseAssetInfo(baseAssetId),
    [baseAssetId, assetInfoProps]
  );
  const { accountConnected, isLoading } = useNetworkConnection();
  const { balance, isFetching } = useBalance({
    address: _address ? _address : accountConnected,
  });
  const [formatted, setFormatted] = useState<string | undefined>();

  useEffect(() => {
    if (!balance || !assetInfo) return;

    const formatted = irregularToDecimalFormatted(balance, {
      significantFigures: 4,
      assetInfo,
    });

    setFormatted(formatted);
  }, [assetInfo, assetInfoFinder, balance]);

  return { balance, assetInfo, formatted, isLoading: isLoading || isFetching };
}
