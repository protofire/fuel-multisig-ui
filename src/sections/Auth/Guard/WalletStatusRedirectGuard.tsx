import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

import { DELAY_UNTIL_READ_WALLETS } from "@/config/app";
import { ROUTES } from "@/config/routes";
import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { useDelay } from "@/hooks/common/useDelay";
import { useByOwnerSignersAccount } from "@/hooks/storageMultisignatures/useByOwnerSignersAccount";
import { FallbackSpinner } from "@/sections/shared/common/FallbackSpinner";

type Props = PropsWithChildren;

export function WalletStatusRedirectGuard({ children }: Props) {
  const router = useRouter();
  const pathRoute = usePathname();
  const params = useSearchParams();

  const { accountConnected } = useNetworkConnection();
  const isDelayFinished = useDelay(DELAY_UNTIL_READ_WALLETS);
  const { multisigs: signatoriesAccount } = useByOwnerSignersAccount();
  const defaultPath = params.get("redirect")
    ? (params.get("redirect") as string)
    : ROUTES.Welcome;

  useEffect(() => {
    if (
      !accountConnected ||
      signatoriesAccount === undefined ||
      pathRoute !== ROUTES.Connect
    )
      return;

    router.replace(defaultPath);
  }, [accountConnected, router, signatoriesAccount, defaultPath, pathRoute]);

  if (!isDelayFinished) return <FallbackSpinner />;

  return children;
}
