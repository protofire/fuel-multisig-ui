"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useBreadcrumb } from "@/context/BreadcrumbContext";
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

  return <AppLayout>{children}</AppLayout>;
}
