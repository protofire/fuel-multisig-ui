import { AppLayout } from "@/sections/layout/AppLayout";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
