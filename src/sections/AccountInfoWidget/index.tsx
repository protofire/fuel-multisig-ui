import { CHAINS_COLORS } from "@/config/chains";
import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";

import { AccountInfoUI } from "./AccountInfoUI";

export function AccountInfoWidget() {
  const { chainInfo } = useNetworkConnection();
  const chainName = chainInfo?.name || "";
  const networkColor =
    (chainInfo && CHAINS_COLORS[chainName]) || CHAINS_COLORS["Unknown"];
  const address =
    "fuel1zxcfw65d5nx3y7ghd9f5q6jxgsmn40se73el58292xcer78kx2nseeyx0e" ||
    "-" ||
    undefined;
  const name = "my-fancy-wallet" || undefined;
  const threshold = 1;
  const ownersCount = 2;

  return (
    <AccountInfoUI
      networkColor={networkColor}
      networkName={chainName}
      name={name}
      address={address}
      threshold={threshold}
      ownersCount={ownersCount}
    />
  );
}
