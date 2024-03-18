import { FueletIcon } from "./FueletIcon";
import { FuelWalletDevIcon } from "./FuelWalletDevIcon";
import { FuelWalletIcon } from "./FuelWalletIcon";

type PathName = string | undefined | null;

function getSvgFileName(path: PathName): string {
  if (!path) return "";

  const fileName = path.split("/").pop();

  if (fileName && fileName.endsWith(".svg")) {
    return fileName;
  }

  return "";
}

export function getConnectorImage(image: PathName) {
  const svgName = getSvgFileName(image);

  switch (svgName) {
    case "fuel-wallet.svg":
      return <FuelWalletIcon />;
    case "fuel-wallet-dev.svg":
      return <FuelWalletDevIcon />;
    case "fuelet-dark.svg":
      return <FueletIcon theme="dark" />;

    default:
      return <FuelWalletDevIcon />;
  }
}
