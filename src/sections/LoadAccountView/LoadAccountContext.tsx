import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";

import { ChainInfo } from "@/domain/ChainInfo";
import { Owner } from "@/domain/MultisignatureAccount";
import { ManagerActiveStep } from "@/hooks/common/useManagerActiveStep";

export interface LoadAccountForm {
  walletName: string;
  deployedMultisigAddress: string;
  owners: Owner[];
  threshold: number;
}

export interface LoadAccontData {
  inputFormManager: UseFormReturn<LoadAccountForm>;
  managerStep: ManagerActiveStep;
  reset: () => void;
  chainInfo: ChainInfo;
  accountsCount: number;
}

export const LoadAccountContext = createContext({} as LoadAccontData);

export function useLoadAccountContext() {
  const context = useContext(LoadAccountContext);
  if (!context) {
    throw new Error(
      "useLoadAccountContext must be used within the context Provider"
    );
  }
  return context;
}
