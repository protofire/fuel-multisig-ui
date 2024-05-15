import { createContext } from "react";
import { UseFormReturn } from "react-hook-form";

import { Owner } from "@/domain/MultisignatureAccount";
import { ManagerActiveStep } from "@/hooks/common/useManagerActiveStep";

export interface SettingsMultisigForm {
  owners: Owner[];
}

export interface SettingsMultisigContextData {
  managerStep: ManagerActiveStep;
  inputFormManager: UseFormReturn<SettingsMultisigForm>;
  threshold: number;
}

export const SettingsMultisigContext = createContext(
  {} as SettingsMultisigContextData
);
