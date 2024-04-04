import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import { useInteractionError } from "@/context/InteractionErrorContext/useInteractionError";
import { ChainInfo } from "@/domain/ChainInfo";
import { useEffectOnceIf } from "@/hooks/common/useEffectOnceIf";
import { useManagerActiveStep } from "@/hooks/common/useManagerActiveStep";
import { useDraftMultisigDeployed } from "@/hooks/multisigContract/useDraftMultisigDeployed";
import { OwnersStep } from "@/sections/NewAccountView/creation/OwnersStep";
import { MultisigCreationStep } from "@/sections/NewAccountView/creation/WalletCreationStep";
import { BaseStepper, transformSteps } from "@/sections/shared/BaseStepper";

import ErrorMessage from "../common/ErrorMessage";
import {
  CreateAccountContext,
  CreateAccountForm,
} from "./CreateAccountContext";
import { ReviewStep } from "./creation/ReviewStep";

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
  {
    id: 2,
    name: "Review",
    label: "Confirm that the settings are correct",
    Component: ReviewStep,
  },
];

export function CreateAccountStepper({
  chainId: networkId,
}: CreateAccountFormProps) {
  const managerStep = useManagerActiveStep(steps.length);
  const formSteps = useMemo(() => transformSteps(steps), []);
  const { draftMultisigAccount, setDeployedMultisig } =
    useDraftMultisigDeployed();
  const inputFormManager = useForm<CreateAccountForm>({
    mode: "onBlur",
    defaultValues: {
      owners: [],
      walletName: "",
      deployedMultisigAddress: "",
      threshold: 1,
    },
  });

  const { error, setError } = useInteractionError();
  const { deployedMultisigAddress, walletName } = inputFormManager.getValues();

  useEffect(() => {
    if (
      deployedMultisigAddress &&
      deployedMultisigAddress !== draftMultisigAccount?.address
    ) {
      setDeployedMultisig({
        address: deployedMultisigAddress,
        name: walletName,
        networkId,
      });
    }
  }, [
    draftMultisigAccount?.address,
    deployedMultisigAddress,
    walletName,
    networkId,
    setDeployedMultisig,
    draftMultisigAccount,
  ]);

  useEffectOnceIf(() => {
    if (!draftMultisigAccount) return;

    inputFormManager.setValue(
      "deployedMultisigAddress",
      draftMultisigAccount.address
    );
    inputFormManager.setValue("walletName", draftMultisigAccount.name);
    managerStep.upStep();
  }, draftMultisigAccount?.address !== undefined && deployedMultisigAddress === "");

  const reset = useCallback(() => {
    setDeployedMultisig(null);
    managerStep.resetSteps();
    inputFormManager.reset();
  }, [inputFormManager, managerStep, setDeployedMultisig]);

  return (
    <CreateAccountContext.Provider
      value={{
        managerStep,
        inputFormManager,
        reset,
      }}
    >
      {error?.msg && (
        <ErrorMessage error={error} clearError={() => setError(null)} />
      )}

      <BaseStepper managerStep={managerStep} steps={formSteps} />
    </CreateAccountContext.Provider>
  );
}
