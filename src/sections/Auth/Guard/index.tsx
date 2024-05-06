import { PropsWithChildren } from "react";

import { FallbackSpinner } from "@/sections/common/FallbackSpinner";

import { ConnectionGuard } from "./ConnectedGuard";
import { WalletStatusRedirectGuard } from "./WalletStatusRedirectGuard";

type GuardProps = PropsWithChildren & {
  connectedWalletRequired: boolean;
};

export const Guard = ({
  children,
  connectedWalletRequired = false,
}: GuardProps) => {
  if (connectedWalletRequired) {
    return (
      <ConnectionGuard
        fallback={<FallbackSpinner text="Checking wallet connection" />}
      >
        {children}
      </ConnectionGuard>
    );
  }

  return <WalletStatusRedirectGuard>{children}</WalletStatusRedirectGuard>;
};
