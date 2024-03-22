import { AppLayout } from "@/sections/layout/AppLayout";

export default function TransactionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
