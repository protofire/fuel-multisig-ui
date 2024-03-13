"use client";
import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MainContentWrapper = styled(Box)<BoxProps>({
  flexGrow: 1,
  minWidth: 0,
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
});
