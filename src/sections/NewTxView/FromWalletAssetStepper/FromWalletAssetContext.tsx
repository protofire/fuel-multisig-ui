import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";

import { AssetAmount } from "@/domain/ui/AssetAmount";
import { ManagerActiveStep } from "@/hooks/common/useManagerActiveStep";

export interface FromWalletAssetForm {
  recipientAddress: string;
  amount: string;
  assetId: string;
  asset?: AssetAmount;
}

export interface FromWalletStepperState {
  inputFormManager: UseFormReturn<FromWalletAssetForm>;
  managerStep: ManagerActiveStep;
  reset: () => void;
}

export const TransferAssetContext = createContext({} as FromWalletStepperState);

export function useFromWalletAssetContext() {
  const context = useContext(TransferAssetContext);
  if (!context) {
    throw new Error(
      "useFromWalletAssetContext must be used within the context Provider"
    );
  }
  return context;
}
