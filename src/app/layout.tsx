import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";

import { MAIN_COLOR } from "@/themes/palette";

import MyApp from "./MyApp";

export const metadata: Metadata = {
  title: "Fuel Multisig Wallet",
  description:
    "Fuel Multisig UI is a user-friendly interfae for interacting with a Multi-signature smart contract in the Fuel Ecosystem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader color={MAIN_COLOR} />
        <MyApp>{children}</MyApp>
      </body>
    </html>
  );
}
