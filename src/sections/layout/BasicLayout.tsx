import { Container } from "@mui/material";
import React from "react";

import { TopBar } from "@/sections/layout/TopBar";
import { VerticalLayoutWrapper } from "@/sections/layout/wrapper/VerticalLayoutWrapper";

import { MainContentWrapper } from "./wrapper/MainContentWrapper";

interface LayoutProps {
  children: React.ReactNode;
}

export const BasicLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <VerticalLayoutWrapper>
      <MainContentWrapper>
        <TopBar />
        <Container>{children}</Container>
      </MainContentWrapper>
    </VerticalLayoutWrapper>
  );
};
