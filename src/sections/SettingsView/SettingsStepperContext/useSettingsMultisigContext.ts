import { useContext } from "react";

import { SettingsMultisigContext } from ".";

export function useSettingsMultisigContext() {
  const context = useContext(SettingsMultisigContext);
  if (!context) {
    throw new Error(
      "useSettingsMultisigContext must be used within the context Provider"
    );
  }
  return context;
}
