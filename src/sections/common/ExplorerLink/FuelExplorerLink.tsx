import { ExplorerLink } from ".";

const EXPLORER_URL = "https://fuel-explorer.vercel.app/";

interface Props {
  hash: string;
}

export function FuelExplorerLink({ hash }: Props) {
  return (
    <ExplorerLink
      explorerConfig={{ baseUrl: EXPLORER_URL, path: "contract" }}
      txHash={hash}
    />
  );
}
