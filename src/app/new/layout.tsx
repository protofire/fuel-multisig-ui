"use client";
import { Guard } from "@/sections/Auth/Guard";
import { BasicLayout } from "@/sections/layout/BasicLayout";

export default function NewLayout({ children }: { children: React.ReactNode }) {
  return (
    <Guard connectedWalletRequired={true}>
      <BasicLayout>{children}</BasicLayout>
    </Guard>
  );
}
