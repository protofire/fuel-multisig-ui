import { useEffect, useMemo } from "react";

import { useInteractionError } from "@/context/InteractionErrorContext/useInteractionError";
import { ChainInfo } from "@/domain/ChainInfo";
import { useEffectOnceIf } from "@/hooks/common/useEffectOnceIf";
import { useForm } from "@/hooks/common/useForm";
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

export function CreateAccountStepper({
  chainId: networkId,
}: CreateAccountFormProps) {
  const managerStep = useManagerActiveStep(steps.length);
  const formSteps = useMemo(() => transformSteps(steps), []);
  const inputFormManager = useForm<CreateAccountForm>({
    walletName: "",
    deployedMultisigAddress: "",
    owners: [],
    threshold: 1,
  });
  const { draftMultisigAccount, setDeployedMultisig } =
    useDraftMultisigDeployed();
  const { error, setError } = useInteractionError();
  const { deployedMultisigAddress, walletName } = inputFormManager.values;

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
  ]);

  useEffectOnceIf(() => {
    if (!draftMultisigAccount) return;

    inputFormManager.setValue(
      "deployedMultisigAddress",
      draftMultisigAccount.address
    );
    inputFormManager.setValue("walletName", walletName);
    managerStep.upStep();
  }, draftMultisigAccount?.address !== undefined && deployedMultisigAddress === "");

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
