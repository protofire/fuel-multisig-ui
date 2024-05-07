"use client";
import { Guard } from "@/sections/Auth/Guard";
import { BasicLayout } from "@/sections/layout/BasicLayout";

export default function ConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Guard connectedWalletRequired={false}>
      <BasicLayout>{children}</BasicLayout>
    </Guard>
  );
}
