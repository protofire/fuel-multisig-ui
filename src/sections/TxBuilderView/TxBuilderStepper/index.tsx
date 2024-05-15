"use client";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";

import { useManagerActiveStep } from "@/hooks/common/useManagerActiveStep";
import { useParseMetadataField } from "@/hooks/useParseMetadataField";
import { BaseStepper, transformSteps } from "@/sections/shared/BaseStepper";
import {
  TxBuilderContext,
  TxBuilderForm,
} from "@/sections/TxBuilderView/TxBuilderContext/TxBuilderContext";

import { ImportContractStep } from "./ImportContractStep";
import { MethodSelectorStep } from "./MethodSelectorStep";

const steps = [
  {
    id: 0,
    name: "Import Contract",
    label: "Import a Contract to get the methods to interact with it.",
    Component: ImportContractStep,
  },
  {
    id: 1,
    name: "Method Selector",
    label: "Set the transaction Information.",
    Component: MethodSelectorStep,
  },
];

export function TxBuilderStepper() {
  const managerStep = useManagerActiveStep(steps.length);
  const formSteps = useMemo(() => transformSteps(steps), []);
  const metadataManager = useParseMetadataField();
  const inputFormManager = useForm<TxBuilderForm>({
    mode: "all",
    defaultValues: {
      contractAddress: "",
      metadataSource: undefined,
      abiMethodSelected: "",
      abiMethodParams: "",
    },
  });

  return (
    <TxBuilderContext.Provider
      value={{
        managerStep,
        inputFormManager,
        metadataManager,
      }}
    >
      <BaseStepper
        orientation="horizontal"
        steps={formSteps}
        managerStep={managerStep}
      />
    </TxBuilderContext.Provider>
  );
}
