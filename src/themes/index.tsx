"use client";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import localFont from "next/font/local";
import { ReactNode, useMemo } from "react";

import { Settings } from "@/themes/types";

import GlobalStyling from "./GlobalStyling";
import componentsOverride from "./overrides";
import Palette from "./palette";
import CustomShadows from "./shadows";
import typographyOptions from "./typography";

// ==============================|| DEFAULT THEME - MAIN  ||============================== //

const Px_Grotesk = localFont({
  src: [
    {
      path: "../app/fonts/Px-Grotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/Px-Grotesk-Regular-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../app/fonts/Px-Grotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../app/fonts/Px-Grotesk-Light.woff2",
      weight: "200",
      style: "normal",
    },
  ],
});
export default function ThemeCustomization({
  children,
  settings,
}: {
  children: ReactNode;
  settings: Settings;
}) {
  const { mode, skin } = settings;
  const theme = Palette({ mode, skin });

  const themeTypography = typographyOptions(
    [Px_Grotesk.style.fontFamily].join(",")
  );

  const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme]);

  const themeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1536,
        },
      },
      spacing: 8,
      Direction: "ltr",
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
      palette: theme.palette,
      customShadows: themeCustomShadows,
      typography: themeTypography,
    }),
    [theme.palette, themeCustomShadows, themeTypography]
  );

  let themes = createTheme(themeOptions);
  themes = createTheme(themes, {
    components: { ...componentsOverride(themes) },
  });

  return (
    <div className={Px_Grotesk.className}>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={themes}>
          <CssBaseline />
          <GlobalStyles styles={() => GlobalStyling(theme) as any} />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </div>
  );
}
