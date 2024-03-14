import { FuelConnector } from "@fuel-wallet/sdk";

import { FuelWalletDevIcon } from "./FuelWalletDevIcon";

type PathName = string | undefined;

function getSvgFileName(path: PathName): string {
  if (!path) return "";

  const fileName = path.split("/").pop();

  if (fileName && fileName.endsWith(".svg")) {
    return fileName;
  }

  return "";
}

export function getConnectorImage(path: PathName) {
  const name: FuelConnector["name"] = getSvgFileName(path);

  switch (name) {
    case "Fuel Wallet":
      return <FuelWalletDevIcon />;
    case "Fuel Wallet Development":
      return <FuelWalletDevIcon />;
    case "Fuelet Wallet":
      return <FuelWalletDevIcon />;

    default:
      return <FuelWalletDevIcon />;
  }
}
