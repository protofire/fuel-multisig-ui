import { CHAINS_COLORS } from "@/config/chains";
import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { useMultisignatureAccountSelected } from "@/hooks/multisignatureSelected/useMultisignatureAccountSelected";

import { AccountInfoUI } from "./AccountInfoUI";

export function AccountInfoWidget() {
  const { chainInfo } = useNetworkConnection();
  const chainName = chainInfo?.name || "";
  const networkColor =
    (chainInfo && CHAINS_COLORS[chainName]) || CHAINS_COLORS["Unknown"];
  // const address =
  //   "fuel1zxcfw65d5nx3y7ghd9f5q6jxgsmn40se73el58292xcer78kx2nseeyx0e" ||
  //   "-" ||
  //   undefined;
  // const name = "my-fancy-wallet" || undefined;
  // const threshold = 1;
  // const ownersCount = 2;
  const { multisigSelected } = useMultisignatureAccountSelected();

  if (!multisigSelected) return null;

  return (
    <AccountInfoUI
      networkColor={networkColor}
      networkName={chainName}
      name={multisigSelected.name}
      address={multisigSelected.address}
      threshold={multisigSelected.threshold}
      ownersCount={multisigSelected.owners.length}
    />
  );
}
