"use client";
import { useMemo } from "react";

import { BaseStepper, transformSteps } from "@/sections/shared/BaseStepper";

import { useSettingsMultisigContext } from "../../SettingsStepperContext/useSettingsMultisigContext";
import { AddOwnerStep } from "./AddOwnerStep";
import { ConfirmAddOwnerStep } from "./ConfirmAddOwnerStep";

export const ADD_OWNER_STEPS = [
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
  const { managerStep } = useSettingsMultisigContext();
  const formSteps = useMemo(() => transformSteps(ADD_OWNER_STEPS), []);

  return <BaseStepper managerStep={managerStep} steps={formSteps} />;
}
