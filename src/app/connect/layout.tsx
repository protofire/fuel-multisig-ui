"use client";
import { Suspense } from "react";

import { Guard } from "@/sections/Auth/Guard";
import { BasicLayout } from "@/sections/layout/BasicLayout";
import { FallbackSpinner } from "@/sections/shared/common/FallbackSpinner";

export default function ConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Guard connectedWalletRequired={false}>
      <BasicLayout>
        <Suspense fallback={<FallbackSpinner />}>{children}</Suspense>
      </BasicLayout>
    </Guard>
  );
}
