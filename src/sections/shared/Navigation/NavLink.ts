import {
  Book,
  HomeRounded,
  ImportExport,
  Layers as IconTxBuilder,
  Settings as IconSettings,
  SvgIconComponent,
  Toll as IconAssets,
} from "@mui/icons-material";

import { ROUTES } from "@/config/routes";

export type NavLink = {
  id: string;
  title: string;
  type: string;
  url: string;
  icon: SvgIconComponent;
  target: boolean;
};

const icons = {
  HomeRounded,
  IconTxBuilder,
  Book,
  IconSettings,
  IconAssets,
  ImportExport,
};

export const MENU_ITEMS: NavLink[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "item",
    url: ROUTES.App,
    icon: icons.HomeRounded,
    target: true,
  },
  {
    id: "assets",
    title: "Assets",
    type: "item",
    url: ROUTES.Assets,
    icon: icons.IconAssets,
    target: true,
  },
  {
    id: "transactions",
    title: "Transactions",
    type: "item",
    url: ROUTES.Transactions,
    icon: icons.ImportExport,
    target: true,
  },
  {
    id: "settings",
    title: "Settings",
    type: "item",
    url: ROUTES.Settings,
    icon: icons.IconSettings,
    target: true,
  },
];
