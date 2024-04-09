"use client";
import { Link, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";

import { APP_VERSION } from "@/config/environment";
import { isBetaVersion } from "@/utils/version";

import { FooterContainer } from "./styled";

export const Footer: React.FC = () => {
  const isBeta = isBetaVersion(APP_VERSION);

  return (
    <FooterContainer>
      {isBeta && (
        <Tooltip
          title="This project is in beta. Use at your own risk."
          placement="top"
        >
          <Typography variant="caption">Beta version</Typography>
        </Tooltip>
      )}
      {APP_VERSION && (
        <Typography variant="caption">
          <Stack display={"flex"} direction={"row"}>
            UI: &nbsp;
            <Link
              underline="hover"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/protofire/fuel-multisig-ui"
            >
              v{APP_VERSION}
            </Link>
          </Stack>
        </Typography>
      )}
    </FooterContainer>
  );
};
