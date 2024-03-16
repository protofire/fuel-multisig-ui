import { Box, Skeleton } from "@mui/material";
import React from "react";

export function AccountBalanceSkeleton() {
  return (
    <Skeleton animation="wave" variant="rectangular" width={80} height={16} />
  );
}

export function AccountSelectSkeleton() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        margin: "0 1rem 0 0",
      }}
    >
      <Skeleton animation="wave" variant="circular" width={44} height={44} />
      <Box
        sx={{
          display: "flex",
          alignItems: "left",
          flexDirection: "column",
          gap: "0.3rem",
        }}
      >
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={120}
          height={12}
        />
        <AccountBalanceSkeleton />
      </Box>
    </Box>
  );
}
