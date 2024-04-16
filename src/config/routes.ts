export const ROUTES = {
  Welcome: "/welcome",
  App: "/app",
  New: "/new",
  Assets: "/app/assets",
  Transactions: "/transactions",
  Settings: "/settings",
} as const;

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES];

export const routeValues: RouteValue[] = Object.values(ROUTES);
