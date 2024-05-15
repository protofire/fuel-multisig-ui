import { createContext } from "react";

import { ManagerActiveStep } from "@/hooks/common/useManagerActiveStep";

export interface TxBuilderForm {
  address: string;
}

export interface TxBuilderContextData {
  managerStep: ManagerActiveStep;
}

export const TxBuilderContext = createContext({} as TxBuilderContextData);
