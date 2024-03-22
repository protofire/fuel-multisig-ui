import { AppLayout } from "@/sections/layout/AppLayout";

export default function AssetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
