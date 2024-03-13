import { BasicLayout } from "@/sections/layout/BasicLayout";

export default function WelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BasicLayout>{children}</BasicLayout>;
}
