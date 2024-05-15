import { createContext } from "react";
import { UseFormReturn } from "react-hook-form";

import { MultisignatureAccount, Owner } from "@/domain/MultisignatureAccount";
import { ManagerActiveStep } from "@/hooks/common/useManagerActiveStep";

export interface SettingsMultisigForm {
  owner: Owner;
  threshold: number;
}

export interface SettingsMultisigContextData {
  managerStep: ManagerActiveStep;
  inputFormManager: UseFormReturn<SettingsMultisigForm>;
  multisigSelected: MultisignatureAccount | undefined;
}

export const SettingsMultisigContext = createContext(
  {} as SettingsMultisigContextData
);
