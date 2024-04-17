import { createConfig } from "fuels";

export default createConfig({
  contracts: ["../fuel-multisig/multisig-contract"],
  output: "./src/services/contracts/multisig",
});

/**
 * Check the docs:
 * https://fuellabs.github.io/fuels-ts/guide/cli/config-file
 */
