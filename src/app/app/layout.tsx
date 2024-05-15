"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { Guard } from "@/sections/Auth/Guard";
import { AppLayout } from "@/sections/layout/AppLayout";

export default function AppDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { addBreadcrumb } = useBreadcrumb();
  const path = usePathname();

  useEffect(() => {
    addBreadcrumb(path);
  }, [addBreadcrumb, path]);

  return (
    <Guard connectedWalletRequired={true}>
      <AppLayout>{children}</AppLayout>
    </Guard>
  );
}
