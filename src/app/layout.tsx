import type { Metadata } from "next";

import MyApp from "./MyApp";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

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
        <MyApp>{children}</MyApp>
      </body>
    </html>
  );
}
