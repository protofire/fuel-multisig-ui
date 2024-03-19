import {
  Box,
  BoxProps,
  Divider,
  List,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
  ListProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  LoadingButton,
  LoadingButtonProps,
} from "@/sections/common/LoadingButton";

export const StyledConnectButton = styled(LoadingButton)<LoadingButtonProps>(
  ({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.black,
    "&:hover": {
      opacity: "0.9",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.black,
    },
  })
);

export const ModalStyledList = styled(List)<ListProps>(() => ({
  margin: "0 auto",
  width: "30rem",
  "&:hover": {
    borderRadius: "1.8rem",
  },
}));

export const ModalStyledListItemIcon = styled(ListItemIcon)<ListProps>(() => ({
  minWidth: "2rem",
}));

export const ModalStyledListItemText = styled(ListItemText)<ListProps>(() => ({
  fontSize: "1.1rem",
}));

export const ModalStyledListItem = styled(ListItemButton)<ListItemButtonProps>(
  () => ({
    borderRadius: "1.8rem",

    "&:hover": {
      borderRadius: "1.8rem",
      backgroundColor: "rgba(98, 98, 98, 0.26)",
    },
  })
);

export const ModalTypography = styled(Typography)<TypographyProps>(() => ({
  textAlign: "center",
  fontWeight: "normal",
  marginBottom: "1.5rem",
}));

export const ModalStyledDivider = styled(Divider)(() => ({
  margin: "1rem",
  borderColor: "rgba(255, 255, 255, 0.1)",
}));

export const ModalStyled = styled(Box)<BoxProps>(() => ({
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  height: "auto",
  textAlign: "justify",
  backgroundColor: "rgba(0, 0, 0, 1)",
  border: "2px solid #000",
  borderRadius: "1rem",
  padding: "3rem 3rem 2.5rem 3rem",
  boxShadow: "0px 4px 50px 0px rgba(255, 255, 255, 0.1);",
  color: "white",
  display: "flex",
  flexDirection: "column",
}));
