import { createContext, useContext } from "react";

import { Owner } from "@/domain/MultisignatureAccount";
import { UseFormReturn } from "@/hooks/common/useForm";
import { ManagerActiveStep } from "@/hooks/common/useManagerActiveStep";

export interface CreateAccountForm {
  walletName: string;
  deployedMultisigAddress: string;
  owners: Owner[];
  threshold: number;
}

export interface CreateAccontData {
  inputFormManager: UseFormReturn<CreateAccountForm>;
  managerStep: ManagerActiveStep;
}

export const CreateAccountContext = createContext({} as CreateAccontData);

export function useCreateAccountContext() {
  const context = useContext(CreateAccountContext);
  if (!context) {
    throw new Error(
      "useCreateAccountContext must be used within the context Provider"
    );
  }
  return context;
}
