"use client";

import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { PropsWithChildren } from "react";

import { useInteractionError } from "@/context/InteractionErrorContext/useInteractionError";
import { useSettingsTheme } from "@/context/SettingsThemeConsumer";
import {
  MainContentWrapper,
  VerticalLayoutWrapper,
} from "@/sections/layout/wrapper";

import { scalePixels } from "../../themes/spacing";
import ErrorMessage from "../shared/common/ErrorMessage";
import { Footer } from "./Footer";
import { TopBar } from "./TopBar";
import { VerticalMenuBar } from "./VerticalMenuBar";

const ContentWrapper = styled(Box)<
  BoxProps & { drawerwidth: number; navopen: boolean | string }
>(({ theme, drawerwidth, navopen }) => ({
  width: "100%",
  paddingTop: theme.spacing(10),
  paddingLeft: navopen
    ? theme.spacing(scalePixels(drawerwidth) + 4)
    : theme.spacing(4),
  paddingRight: theme.spacing(4),
  [theme.breakpoints.up("xl")]: {
    paddingLeft: theme.spacing(scalePixels(drawerwidth) + 20),
    paddingRight: theme.spacing(20),
  },
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  [theme.breakpoints.down("xs")]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { settings } = useSettingsTheme();
  const marginLeft = settings.navOpen ? settings.drawerWidth || 0 : 0;
  const { error, setError } = useInteractionError();

  return (
    <VerticalLayoutWrapper>
      <MainContentWrapper>
        <TopBar />
        <VerticalMenuBar />
        <ContentWrapper
          drawerwidth={marginLeft}
          component="main"
          navopen={settings.navOpen.toString()}
        >
          <>
            {error?.msg && (
              <ErrorMessage error={error} clearError={() => setError(null)} />
            )}
            {children}
          </>
        </ContentWrapper>
        <Footer />
      </MainContentWrapper>
    </VerticalLayoutWrapper>
  );
};
