import { useContext } from "react";

import { NetworkConnectionContext } from "./NetworkConnectionContext";

export const useNetworkConnection = () => {
  const context = useContext(NetworkConnectionContext);
  if (context === undefined) {
    throw new Error(
      "useNetworkConnection must be used within a NetworkConnectionProvider"
    );
  }
  return context;
};
