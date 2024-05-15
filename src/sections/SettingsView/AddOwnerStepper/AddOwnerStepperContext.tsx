import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";

import { Owner } from "@/domain/MultisignatureAccount";
import { ManagerActiveStep } from "@/hooks/common/useManagerActiveStep";

export interface AddOnwerForm {
  owners: Owner[];
}

export interface AddOwnerContextData {
  managerStep: ManagerActiveStep;
  inputFormManager: UseFormReturn<AddOnwerForm>;
  threshold: number;
}

export const AddOwnerContext = createContext({} as AddOwnerContextData);

export function useAddOwnerContext() {
  const context = useContext(AddOwnerContext);
  if (!context) {
    throw new Error(
      "useAddOwnerContext must be used within the context Provider"
    );
  }
  return context;
}
