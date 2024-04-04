import { useEffect, useState } from "react";

import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import {
  getLocalStorageState,
  setLocalStorageState,
} from "@/utils/localStorage";

const MULTISIG_ITEM = "draftDeployedMultisig";

type DraftDeployedMultisig = Pick<
  MultisignatureAccount,
  "address" | "name" | "networkId"
>;

export interface UseMultisigDeployedReturnType {
  draftMultisigAccount: DraftDeployedMultisig | null;
  setDeployedMultisig: (
    value: DraftDeployedMultisig | undefined | null
  ) => void;
}

export const useDraftMultisigDeployed = (): UseMultisigDeployedReturnType => {
  const [draftMultisigAccount, setDeployedMultisig] =
    useState<DraftDeployedMultisig | null>(() =>
      getLocalStorageState<
        UseMultisigDeployedReturnType["draftMultisigAccount"]
      >(MULTISIG_ITEM, null)
    );

  const _setContractAddress = (
    value: DraftDeployedMultisig | undefined | null
  ) => {
    if (value === undefined) return;

    setDeployedMultisig(value);
  };

  useEffect(() => {
    if (draftMultisigAccount !== undefined) {
      setLocalStorageState(MULTISIG_ITEM, draftMultisigAccount || "");
    }
  }, [draftMultisigAccount]);

  return {
    draftMultisigAccount,
    setDeployedMultisig: _setContractAddress,
  };
};
