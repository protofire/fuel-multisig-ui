"use client";
import { Suspense } from "react";

import { Guard } from "@/sections/Auth/Guard";
import { FallbackSpinner } from "@/sections/common/FallbackSpinner";
import { BasicLayout } from "@/sections/layout/BasicLayout";

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
