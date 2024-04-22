import { createContext, PropsWithChildren, useCallback } from "react";

import { useModalBehaviour } from "@/hooks/common/useModalBehaviour";
import { createNotImplementedWarning } from "@/utils/error";

export interface FormatAccountWalletItemState {
  toggleAddressFormat: () => void;
  isB256Activated: boolean;
}

export const FormatAccountWalletItemContext =
  createContext<FormatAccountWalletItemState>({
    isB256Activated: false,
    toggleAddressFormat: () =>
      createNotImplementedWarning("toggleAddressFormat"),
  });

export const FormatAccountWalletItemProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const {
    isOpen: isB256Activated,
    openModal: toggleOn,
    closeModal: toggleOff,
  } = useModalBehaviour();

  const toggleAddressFormat = useCallback(() => {
    isB256Activated ? toggleOff() : toggleOn();
  }, [isB256Activated, toggleOff, toggleOn]);

  return (
    <FormatAccountWalletItemContext.Provider
      value={{ toggleAddressFormat, isB256Activated }}
    >
      {children}
    </FormatAccountWalletItemContext.Provider>
  );
};
