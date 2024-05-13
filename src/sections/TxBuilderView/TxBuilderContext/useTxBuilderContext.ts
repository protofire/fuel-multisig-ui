import { useContext } from "react";

import { TxBuilderContext } from "./TxBuilderContext";

export function useTxBuilderContext() {
  const context = useContext(TxBuilderContext);
  if (!context) {
    throw new Error(
      "useTxBuilderContext must be used within the context Provider"
    );
  }
  return context;
}
