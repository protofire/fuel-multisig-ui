import { AppLayout } from "@/sections/layout/AppLayout";

export default function AppDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
