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

  // const metadataManager = useParseMetadataField();
  // const inputFormManager = useForm<TxBuilderForm>({
  //   address: "",
  //   metadataSource: undefined,
  //   selectedAbiIdentifier: undefined,
  //   selectedAbiMessage: undefined,
  //   dataArgs: undefined,
  //   transferTxStruct: undefined,
  // });

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
