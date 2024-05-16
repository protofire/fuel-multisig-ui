export const ROUTES = {
  Welcome: "/welcome",
  Connect: "/connect",
  App: "/app",
  New: "/new",
  NewTx: "/app/new-transaction",
  SendAsset: "/app/new-transaction/send-asset",
  FromWallet: "/app/new-transaction/from-wallet",
  Assets: "/app/assets",
  Transactions: "/app/transactions",
  TxBuilder: "/app/transaction-builder",
  Settings: "/app/settings",
  SetOwners: "/app/settings/owners",
  SetThreshold: "/app/settings/threshold",
} as const;

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES];

export const routeValues: RouteValue[] = Object.values(ROUTES);
