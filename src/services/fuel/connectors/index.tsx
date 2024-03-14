import { FuelConnector } from "@fuel-wallet/sdk";

import { FueletIcon } from "./FueletIcon";
import { FuelWalletDevIcon } from "./FuelWalletDevIcon";
import { FuelWalletIcon } from "./FuelWalletIcon";

type PathName = string | undefined;

function getSvgFileName(path: PathName): string {
  if (!path) return "";

  const fileName = path.split("/").pop();

  if (fileName && fileName.endsWith(".svg")) {
    return fileName;
  }

  return "";
}

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
