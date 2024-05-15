"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { useInteractionError } from "@/context/InteractionErrorContext/useInteractionError";
import { Guard } from "@/sections/Auth/Guard";
import { AppLayout } from "@/sections/layout/AppLayout";
import ErrorMessage from "@/sections/shared/common/ErrorMessage";

export default function AppDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { addBreadcrumb } = useBreadcrumb();
  const path = usePathname();
  const { error, setError } = useInteractionError();

  useEffect(() => {
    addBreadcrumb(path);
  }, [addBreadcrumb, path]);

  return (
    <Guard connectedWalletRequired={true}>
      {error?.msg && (
        <ErrorMessage error={error} clearError={() => setError(null)} />
      )}

      <AppLayout>{children}</AppLayout>
    </Guard>
  );
}
