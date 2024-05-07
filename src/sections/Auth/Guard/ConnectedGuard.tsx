import { usePathname, useRouter } from "next/navigation";
import { ReactElement, ReactNode, useEffect } from "react";

import { DELAY_UNTIL_READ_WALLETS } from "@/config/app";
import { ROUTES, RouteValue, routeValues } from "@/config/routes";
import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { useDelay } from "@/hooks/common/useDelay";

interface ConnectionGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const ROUTES_TO_CHECK = routeValues.filter((r) => r !== ROUTES.Connect);

function _getRedirectQuery(initialRoute: string): string {
  if (ROUTES_TO_CHECK.includes(initialRoute as RouteValue)) {
    return `?redirect=${encodeURIComponent(initialRoute)}`;
  }

  return "";
}

export function ConnectionGuard({ children, fallback }: ConnectionGuardProps) {
  const { accountConnected } = useNetworkConnection();
  const router = useRouter();
  const pathname = usePathname();
  const initialRoute = pathname ?? ROUTES.Welcome;
  const isDelayFinished = useDelay(DELAY_UNTIL_READ_WALLETS);

  useEffect(() => {
    if (!router) return;

    if (!accountConnected && isDelayFinished) {
      const queryParams = _getRedirectQuery(initialRoute);

      router.push(`${ROUTES.Connect}${queryParams}`);
    }
  }, [accountConnected, initialRoute, isDelayFinished, router]);

  if (!accountConnected) {
    return fallback;
  }

  return children;
}
