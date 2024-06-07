import { CHAINS_COLORS } from "@/config/chains";
import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { useMultisignatureAccountSelected } from "@/hooks/multisignatureSelected/useMultisignatureAccountSelected";

import { AccountInfoSkeleton } from "./AccountInfoSkeleton";
import { AccountInfoUI } from "./AccountInfoUI";

export function AccountInfoWidget() {
  const { chainInfo } = useNetworkConnection();
  const chainName = chainInfo?.name || "";
  const networkColor =
    (chainInfo?.chainId !== undefined && CHAINS_COLORS[chainInfo.chainId]) ||
    CHAINS_COLORS["default"];
  const { multisigSelected } = useMultisignatureAccountSelected();

  if (!multisigSelected) {
    return (
      <AccountInfoSkeleton
        networkColor={networkColor}
        networkName={chainName}
      />
    );
  }

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
