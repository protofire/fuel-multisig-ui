import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";

import { useManagerActiveStep } from "@/hooks/common/useManagerActiveStep";
import { BaseStepper, transformSteps } from "@/sections/shared/BaseStepper";

import { STEPS } from "./steps";
import { TransactionBox } from "./styled";
import {
  TransferAssetContext,
  FromWalletAssetForm,
} from "./FromWalletAssetContext";

export function FromWalletAssetStepper() {
  const managerStep = useManagerActiveStep(STEPS.length);
  const formSteps = useMemo(() => transformSteps(STEPS), []);
  const inputFormManager = useForm<FromWalletAssetForm>({
    mode: "all",
    defaultValues: {
      recipientAddress: "",
      amount: "",
      assetId: "",
    },
  });

  const reset = useCallback(() => {
    managerStep.resetSteps();
  }, [managerStep]);

  return (
    <TransferAssetContext.Provider
      value={{
        managerStep,
        inputFormManager,
        reset,
      }}
    >
      <TransactionBox>
        <BaseStepper
          managerStep={managerStep}
          steps={formSteps}
          displayStepLabel={false}
        />
      </TransactionBox>
    </TransferAssetContext.Provider>
  );
}
