"use client";

import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { useByOwnerSignersAccount } from "@/hooks/storageMultisignatures/useByOwnerSignersAccount";
import { FallbackSpinner } from "@/sections/common/FallbackSpinner";
import { MainContentCard } from "@/sections/shared/MainContentCard";

import { CreateAccountStepper } from "./CreateAccounStepper";

export default function NewAccountView() {
  const { accountConnected, chainInfo } = useNetworkConnection();
  const { multisigs, isLoading: isFetchingAccounts } =
    useByOwnerSignersAccount();

  if (!chainInfo || !accountConnected || isFetchingAccounts)
    return <FallbackSpinner />;

  return (
    <MainContentCard title="Create new Multisignature Account">
      <CreateAccountStepper
        chainInfo={chainInfo}
        accountsCount={multisigs?.length || 0}
      />
    </MainContentCard>
  );
}
