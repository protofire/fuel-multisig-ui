import { createContext } from "react";
import { UseFormReturn } from "react-hook-form";

import { ManagerActiveStep } from "@/hooks/common/useManagerActiveStep";
import { UseMetadata } from "@/hooks/useParseMetadataField";

export interface TxBuilderForm {
  contractAddress: string;
}

export interface TxBuilderContextData {
  managerStep: ManagerActiveStep;
  inputFormManager: UseFormReturn<TxBuilderForm>;
  metadataManager: UseMetadata;
}

export const TxBuilderContext = createContext({} as TxBuilderContextData);
