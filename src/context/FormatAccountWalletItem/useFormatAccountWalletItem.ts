import { useContext } from "react";

import { FormatAccountWalletItemContext } from ".";

export const useFormatAccountWalletItem = () => {
  const context = useContext(FormatAccountWalletItemContext);
  if (context === undefined) {
    throw new Error(
      "useFormatAccountWalletItem must be used within an FormatAccountWalletItemProvider"
    );
  }
  return context;
};
