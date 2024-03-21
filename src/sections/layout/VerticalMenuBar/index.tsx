"use client";

import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Drawer, DrawerProps, IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { usePathname } from "next/navigation";

import { useSettingsTheme } from "@/context/SettingsThemeConsumer";
import { AccountInfoWidget } from "@/sections/common/AccountInfoWidget";
import Navigation from "@/sections/shared/Navigation";

const DEFAULT_WIDTH = 240;

interface DrawerStyledProps extends DrawerProps {
  drawerwidth: number;
}

const DrawerStyled = styled(Drawer)<DrawerStyledProps>(
  ({ drawerwidth, theme }) => ({
    width: drawerwidth,
    flexShrink: 0,
    boxSizing: "border-box",
    "& .MuiBackdrop-root": {
      display: "none",
    },
    "& .MuiDrawer-paper": {
      marginTop: 66,
      width: drawerwidth,
      borderRight: "none",
      backgroundColor: theme.palette.background.paper,
      elevation: 9,
    },
  })
);

export function VerticalMenuBar() {
  const pathname = usePathname();
  const { settings, saveSettings } = useSettingsTheme();

  const handleDrawerToggle = () => {
    saveSettings({ ...settings, navOpen: !settings.navOpen });
  };

  return (
    <>
      <DrawerStyled
        drawerwidth={settings.drawerWidth || DEFAULT_WIDTH}
        variant="persistent"
        anchor="left"
        open={settings.navOpen}
      >
        <AccountInfoWidget />
        <Navigation currentPath={pathname} />
      </DrawerStyled>
      <Box
        sx={{
          position: "fixed",
          bottom: "0",
          left: "0",
          zIndex: "9999",
          margin: "1rem",
        }}
      >
        <IconButton onClick={handleDrawerToggle}>
          {settings.navOpen ? (
            <Tooltip title="Hide menu" placement="top">
              <MenuOpenIcon fontSize="large" />
            </Tooltip>
          ) : (
            <Tooltip title="Show menu" placement="top">
              <MenuIcon fontSize="large" />
            </Tooltip>
          )}
        </IconButton>
      </Box>
    </>
  );
}
