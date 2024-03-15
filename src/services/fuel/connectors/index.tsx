import { FuelConnector } from "@fuel-wallet/sdk";

import { FueletIcon } from "./FueletIcon";
import { FuelWalletDevIcon } from "./FuelWalletDevIcon";
import { FuelWalletIcon } from "./FuelWalletIcon";

export function getConnectorImage(name: FuelConnector["name"] | undefined) {
  switch (name) {
    case "Fuel Wallet":
      return <FuelWalletIcon />;
    case "Fuel Wallet Development":
      return <FuelWalletDevIcon />;
    case "Fuelet Wallet":
      return <FueletIcon />;

    default:
      return <FuelWalletDevIcon />;
  }
}
