import { useCallback, useEffect, useState } from "react";

import { AccountWalletItem } from "@/domain/ui/AccountSelectItem";

interface Props {
  walletItem: AccountWalletItem | undefined;
}

interface UseToggleAddressFormatReturn {
  currentAddress: string;
  toggleAddressFormat: () => void;
  isb256Address: boolean;
}

export function useToggleAddressFormat({
  walletItem,
}: Props): UseToggleAddressFormatReturn {
  const [currentAddress, setCurrentAddress] = useState("");
  const [isb256Address, setIsb256Address] = useState(false);

  useEffect(() => {
    if (!walletItem) return;

    const address = walletItem?.address.formatted;
    setCurrentAddress(address);
    setIsb256Address(address === walletItem?.address.hex);
  }, [walletItem]);

  const toggleAddressFormat = useCallback(() => {
    if (!walletItem || !currentAddress) return;

    setCurrentAddress(
      isb256Address ? walletItem.address.formatted : walletItem.address.hex
    );
    setIsb256Address((prev) => !prev);
  }, [currentAddress, isb256Address, walletItem]);

  return {
    currentAddress,
    toggleAddressFormat,
    isb256Address,
  };
}
