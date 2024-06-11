"use client";

import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { useByOwnerSignersAccount } from "@/hooks/storageMultisignatures/useByOwnerSignersAccount";
import { FallbackSpinner } from "@/sections/shared/common/FallbackSpinner";
import { MainContentCard } from "@/sections/shared/MainContentCard";

import { LoadAccountStepper } from "./LoadAccountStepper";

export default function LoadAccountView() {
  const { accountConnected, chainInfo } = useNetworkConnection();
  const { multisigs, isLoading: isFetchingAccounts } =
    useByOwnerSignersAccount();

  if (!chainInfo || !accountConnected || isFetchingAccounts)
    return <FallbackSpinner />;

  return (
    <MainContentCard title="Import Multisignature Account">
      <LoadAccountStepper
        chainInfo={chainInfo}
        accountsCount={Array.isArray(multisigs) ? multisigs.length : 0}
      />
    </MainContentCard>
  );
}
