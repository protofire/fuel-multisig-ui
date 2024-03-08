export const ROUTES = {
  Welcome: "/welcome",
  New: "new",
} as const;

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES];

export const routeValues: RouteValue[] = Object.values(ROUTES);
