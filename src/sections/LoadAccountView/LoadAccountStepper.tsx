import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";

import { useInteractionError } from "@/context/InteractionErrorContext/useInteractionError";
import { ChainInfo } from "@/domain/ChainInfo";
import { useManagerActiveStep } from "@/hooks/common/useManagerActiveStep";
import { BaseStepper, transformSteps } from "@/sections/shared/BaseStepper";

import ErrorMessage from "../shared/common/ErrorMessage";
import { ImportMultisigStep } from "./load/ImportMultisigStep";
import { ReviewLoadMultisigStep } from "./load/ReviewLoadMultisigStep";
import { LoadAccountContext, LoadAccountForm } from "./LoadAccountContext";

interface CreateAccountFormProps {
  chainInfo: ChainInfo;
  accountsCount: number;
}

const steps = [
  {
    id: 0,
    name: "Import account",
    label: "Enter your multi-signature account address.",
    Component: ImportMultisigStep,
  },
  {
    id: 1,
    name: "Review",
    label: "Confirm that the settings are correct",
    Component: ReviewLoadMultisigStep,
  },
];

export function LoadAccountStepper({
  chainInfo,
  accountsCount,
}: CreateAccountFormProps) {
  const managerStep = useManagerActiveStep(steps.length);
  const formSteps = useMemo(() => transformSteps(steps), []);
  const inputFormManager = useForm<LoadAccountForm>({
    mode: "all",
    defaultValues: {
      owners: [],
      walletName: "",
      deployedMultisigAddress: "",
      threshold: 1,
    },
  });
  const { error, setError } = useInteractionError();

  const reset = useCallback(() => {
    inputFormManager.reset();
    managerStep.resetSteps();
  }, [inputFormManager, managerStep]);

  if (!chainInfo) return null;

  return (
    <LoadAccountContext.Provider
      value={{
        managerStep,
        inputFormManager,
        reset,
        chainInfo,
        accountsCount,
      }}
    >
      {error?.msg && (
        <ErrorMessage error={error} clearError={() => setError(null)} />
      )}

      <BaseStepper managerStep={managerStep} steps={formSteps} />
    </LoadAccountContext.Provider>
  );
}
