import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";

import { DELAY_UNTIL_READ_WALLETS } from "@/config/app";
import { ROUTES } from "@/config/routes";
import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { useDelay } from "@/hooks/common/useDelay";
import { FallbackSpinner } from "@/sections/common/FallbackSpinner";

type Props = PropsWithChildren;

export function WalletStatusRedirectGuard({ children }: Props) {
  const router = useRouter();
  const { accountConnected, chainInfo } = useNetworkConnection();
  const isDelayFinished = useDelay(DELAY_UNTIL_READ_WALLETS);
  const { data: signatoriesAccount } = useFindSignersAccount({
    ownerAddress: accountConnected?.address,
    networkId: chainInfo?.chainId,
  });
  const defaultPath =
    router.query.redirect !== undefined
      ? (router.query.redirect as string)
      : ROUTES.Welcome;

  useEffect(() => {
    if (
      !accountConnected ||
      signatoriesAccount === undefined ||
      router.route !== ROUTES.Connect
    )
      return;

    const redirectPath = signatoriesAccount.length ? ROUTES.App : defaultPath;

    router.replace(decodeURIComponent(redirectPath));
  }, [accountConnected, router, signatoriesAccount, defaultPath]);

  if (!isDelayFinished) return <FallbackSpinner />;

  return children;
}
