export const ROUTES = {
  Welcome: "/welcome",
  App: "/app",
  New: "/new",
  NewTx: "/app/new-transaction",
  TransferAsset: "/app/new-transaction/asset",
  Assets: "/app/assets",
  Transactions: "/transactions",
  Settings: "/settings",
} as const;

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES];

export const routeValues: RouteValue[] = Object.values(ROUTES);
