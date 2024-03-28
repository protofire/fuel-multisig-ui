import { CHAINS_COLORS } from "@/config/chains";

import { AccountInfoUI } from "./AccountInfoUI";

export function AccountInfoWidget() {
  //const { multisigSelected } = multisigSelected() || undefined;
  //const networkColor = "#00F58C" || undefined;
  const networkColor = (network && CHAINS_COLORS[network]) || undefined;
  const networkName = "FUEL";
  // const { data } = useListSignersAccount({ networkId: network }) || undefined;
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
      networkName={networkName}
      name={name}
      address={address}
      threshold={threshold}
      ownersCount={ownersCount}
      // multisig={data}
    />
  );
}
