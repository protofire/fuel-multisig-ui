import { ExplorerConfig, ExplorerLink } from ".";

const EXPLORER_URL = "https://fuel-explorer.vercel.app/";

interface Props extends Partial<Pick<ExplorerConfig, "path">> {
  hash: string;
}

export function FuelExplorerLink({ hash, path = "contract" }: Props) {
  return (
    <ExplorerLink
      explorerConfig={{ baseUrl: EXPLORER_URL, path }}
      txHash={hash}
    />
  );
}
