import React, { useMemo } from "react";

import { useManagerActiveStep } from "@/hooks/common/useManagerActiveStep";
import { BaseStepper, transformSteps } from "@/sections/shared/BaseStepper";

import { TxBuilderContext } from "../TxBuilderContext/TxBuilderContext";
import { ImportContractStep } from "./ImportContractStep";

const steps = [
  {
    id: 0,
    name: "Import Contract",
    label: "Import a Contract to get the message to interact with it.",
    Component: ImportContractStep,
  },
];

export function TxBuilderStepper() {
  const managerStep = useManagerActiveStep(steps.length);
  const formSteps = useMemo(() => transformSteps(steps), []);

  return (
    <TxBuilderContext.Provider
      value={{
        managerStep,
        // metadataManager,
        // inputFormManager,
      }}
    >
      <BaseStepper steps={formSteps} managerStep={managerStep} />
    </TxBuilderContext.Provider>
  );
}
