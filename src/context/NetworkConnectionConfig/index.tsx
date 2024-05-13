"use client";
import {
  FueletWalletConnector,
  FuelWalletConnector,
  FuelWalletDevelopmentConnector,
} from "@fuels/connectors";
import { FuelProvider } from "@fuels/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";

import { NetworkConnectionProvider } from "./NetworkConnectionContext";

const queryClient = new QueryClient();

export function NetworkConnectionConfig({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <FuelProvider
        fuelConfig={{
          connectors: [
            new FuelWalletConnector(),
            new FuelWalletDevelopmentConnector(),
            new FueletWalletConnector(),
          ],
        }}
      >
        <NetworkConnectionProvider>{children}</NetworkConnectionProvider>
      </FuelProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
