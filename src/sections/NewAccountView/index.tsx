"use client";

import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { FallbackSpinner } from "@/sections/common/FallbackSpinner";
import { MainContentCard } from "@/sections/shared/MainContentCard";

import { CreateAccountStepper } from "./CreateAccounStepper";

export default function NewAccountView() {
  const { accountConnected, chainInfo } = useNetworkConnection();

  if (!chainInfo || !accountConnected) return <FallbackSpinner />;

  return (
    <MainContentCard title="Create new Multisignature Account">
      <CreateAccountStepper chainInfo={chainInfo} />
    </MainContentCard>
  );
}
