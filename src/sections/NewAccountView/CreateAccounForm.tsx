import { useMemo } from "react";

import { useInteractionError } from "@/context/InteractionErrorContext/useInteractionError";
import { ChainInfo } from "@/domain/ChainInfo";
import { useForm } from "@/hooks/common/useForm";
import { useManagerActiveStep } from "@/hooks/common/useManagerActiveStep";
import { OwnersStep } from "@/sections/NewAccountView/creation/OwnersStep";
import { MultisigCreationStep } from "@/sections/NewAccountView/creation/WalletCreationStep";
import { BaseStepper, transformSteps } from "@/sections/shared/BaseStepper";

import ErrorMessage from "../common/ErrorMessage";
import { CreateAccountContext } from "./CreateAccountContext";

interface CreateAccountFormProps {
  chainId: ChainInfo["chainId"];
}

const steps = [
  {
    id: 0,
    name: "Deploy a new account",
    label: "Select a name for your multisignature account and deploy.",
    Component: MultisigCreationStep,
  },
  {
    id: 1,
    name: "Owners and confirmations",
    label: "Add owners and establishes required signatures",
    Component: OwnersStep,
  },
];

export function CreateAccountForm({
  chainId: networkId,
}: CreateAccountFormProps) {
  const managerStep = useManagerActiveStep(steps.length);
  const formSteps = useMemo(() => transformSteps(steps), []);
  const inputFormManager = useForm({
    walletName: "",
  });
  const { error, setError } = useInteractionError();

  return (
    <CreateAccountContext.Provider
      value={{
        managerStep,
        inputFormManager,
      }}
    >
      {error?.msg && (
        <ErrorMessage error={error} clearError={() => setError(null)} />
      )}

      <BaseStepper managerStep={managerStep} steps={formSteps} />
    </CreateAccountContext.Provider>
  );
}
