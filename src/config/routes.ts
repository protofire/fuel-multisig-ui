export const ROUTES = {
  Welcome: "/welcome",
  Connect: "/connect",
  App: "/app",
  New: "/new",
  NewTx: "/app/new-transaction",
  SendAsset: "/app/new-transaction/send-asset",
  Assets: "/app/assets",
  Transactions: "/app/transactions",
  Settings: "/app/settings",
} as const;

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES];

export const routeValues: RouteValue[] = Object.values(ROUTES);
