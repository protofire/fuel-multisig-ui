import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";

import { ManagerActiveStep } from "@/hooks/common/useManagerActiveStep";

export interface TransferAssetForm {
  recipientAddress: string;
}

export interface TransferStepperState {
  inputFormManager: UseFormReturn<TransferAssetForm>;
  managerStep: ManagerActiveStep;
  reset: () => void;
}

export const TransferAssetContext = createContext({} as TransferStepperState);

export function useTransferAssetContext() {
  const context = useContext(TransferAssetContext);
  if (!context) {
    throw new Error(
      "useTransferStepperContext must be used within the context Provider"
    );
  }
  return context;
}
