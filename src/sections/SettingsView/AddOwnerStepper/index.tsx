"use client";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

import { useManagerActiveStep } from "@/hooks/common/useManagerActiveStep";
import { BaseStepper, transformSteps } from "@/sections/shared/BaseStepper";

import { SettingsMultisigForm } from "../SettingsStepperContext/AddOwnerStepperContext";

export function AddOwnerStepper() {
  const managerStep = useManagerActiveStep();
  const formSteps = useMemo(() => transformSteps(steps), []);
  const inputFormManager = useForm<SettingsMultisigForm>({
    mode: "all",
    defaultValues: {
      owners: [],
    },
  });
  //   const { ownersQuery } = useManageOwnersUi({
  //     owners,
  //     accountWalletItemConnected: accountWalletItem,
  //   });

  return (
    // <AddOwnerContext.Provider
    //   value={{
    //     managerStep,
    //     inputFormManager,
    //   }}
    // >
    <BaseStepper managerStep={managerStep} steps={formSteps} />
    // </AddOwnerContext.Provider>
  );
}
