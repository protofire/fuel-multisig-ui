/** @type {import('next').NextConfig} */

import fs from "fs";
import path from "path";

const packageJsonPath = path.resolve("./package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

const version = packageJson.version;

const nextConfig = {
  env: {
    APP_VERSION: version,
  },
  modularizeImports: {
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
};

export default nextConfig;
