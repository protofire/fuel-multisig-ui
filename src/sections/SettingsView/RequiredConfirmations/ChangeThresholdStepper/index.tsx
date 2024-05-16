"use client";
import { useMemo } from "react";

import { BaseStepper, transformSteps } from "@/sections/shared/BaseStepper";

import { useSettingsMultisigContext } from "../../SettingsStepperContext/useSettingsMultisigContext";
import { ChangeThresholdStep } from "./ChangeThresholdStep";
import { ConfirmChangeThresholdStep } from "./ConfirmChangeThresholdStep";

export const ADD_OWNER_STEPS = [
  {
    id: 1,
    name: "Change Threshold",
    label: "",
    Component: ChangeThresholdStep,
  },
  {
    id: 2,
    name: "Confirm",
    label: "",
    Component: ConfirmChangeThresholdStep,
  },
];

export function ChangeThresholdStepper() {
  const { managerStep } = useSettingsMultisigContext();
  const formSteps = useMemo(() => transformSteps(ADD_OWNER_STEPS), []);

  return <BaseStepper managerStep={managerStep} steps={formSteps} />;
}
