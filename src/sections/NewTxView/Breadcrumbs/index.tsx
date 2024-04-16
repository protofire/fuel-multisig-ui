"use client";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NextLink from "next/link";
import React from "react";

import { ROUTES } from "@/config/routes";
import { useBreadcrumb } from "@/context/BreadcrumbContext";

interface Props {
  path?: string;
}

function Breadcrumbs({ path = "main" }: Props) {
  const { breadcrumbs } = useBreadcrumb();
  const theme = useTheme();

  const [, mainPath, actionSelected] = breadcrumbs;

  return (
    <Box display="flex" alignItems="center" gap={2} width="100%">
      <NextLink
        href={mainPath && mainPath.href ? mainPath.href : ROUTES.App}
        passHref
      >
        <Typography variant="h3" color="primary">
          {mainPath?.name ?? path}
        </Typography>
      </NextLink>
      {actionSelected && actionSelected.name ? (
        <>
          <Typography color={theme.palette.grey.A200} variant="h4">
            |
          </Typography>

          <Typography sx={{ fontWeight: 300 }} variant="h4">
            {actionSelected.name}
          </Typography>
        </>
      ) : null}
    </Box>
  );
}

export default Breadcrumbs;
