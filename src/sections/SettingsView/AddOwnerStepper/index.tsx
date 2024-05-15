"use client";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

import { useManagerActiveStep } from "@/hooks/common/useManagerActiveStep";
import { BaseStepper, transformSteps } from "@/sections/shared/BaseStepper";

import { AddOwnerStep } from "./AddOwnerStep";
import { AddOnwerForm } from "./AddOwnerStepperContext";
import { ConfirmAddOwnerStep } from "./ConfirmAddOwnerStep";

const steps = [
  {
    id: 1,
    name: "Add owner",
    label: "",
    Component: AddOwnerStep,
  },
  {
    id: 2,
    name: "Confirm",
    label: "",
    Component: ConfirmAddOwnerStep,
  },
];

export function AddOwnerStepper() {
  const managerStep = useManagerActiveStep();
  const formSteps = useMemo(() => transformSteps(steps), []);
  const inputFormManager = useForm<AddOnwerForm>({
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
