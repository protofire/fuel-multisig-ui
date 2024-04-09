export function isBetaVersion(_version: string): boolean {
  const betaRegex = /-beta|-alpha|-rc/;

  return betaRegex.test(_version);
}
