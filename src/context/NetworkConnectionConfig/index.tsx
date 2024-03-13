"use client";
import { FuelProvider } from "@fuel-wallet/react";
import { PropsWithChildren } from "react";

import { IS_DEVELOPMENT } from "@/config/environment";

import { NetworkConnectionProvider } from "./NetworkConnectionContext";

export function NetworkConnectionConfig({ children }: PropsWithChildren) {
  return (
    <FuelProvider
      fuelConfig={{
        devMode: IS_DEVELOPMENT,
      }}
    >
      <NetworkConnectionProvider>{children}</NetworkConnectionProvider>
    </FuelProvider>
  );
}
