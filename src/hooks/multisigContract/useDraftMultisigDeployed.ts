import { useEffect, useState } from "react";

import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import {
  getLocalStorageState,
  setLocalStorageState,
} from "@/utils/localStorage";

const MULTISIG_ITEM = "multisigId";

type DraftDeployedMultisig = Pick<
  MultisignatureAccount,
  "address" | "name" | "networkId"
>;

export interface UseMultisigDeployedReturnType {
  draftMultisigAccount: DraftDeployedMultisig | null;
  setDeployedMultisig: (value: DraftDeployedMultisig | undefined) => void;
}

export const useDraftMultisigDeployed = (): UseMultisigDeployedReturnType => {
  const [draftMultisigAccount, setDeployedMultisig] =
    useState<DraftDeployedMultisig | null>(() =>
      getLocalStorageState<
        UseMultisigDeployedReturnType["draftMultisigAccount"]
      >(MULTISIG_ITEM, null)
    );

  const _setContractAddress = (value: DraftDeployedMultisig | undefined) => {
    if (value === undefined) return;

    setDeployedMultisig(value);
  };

  useEffect(() => {
    if (draftMultisigAccount !== null) {
      setLocalStorageState(MULTISIG_ITEM, draftMultisigAccount);
    }
  }, [draftMultisigAccount]);

  return {
    draftMultisigAccount,
    setDeployedMultisig: _setContractAddress,
  };
};
