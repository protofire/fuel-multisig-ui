import {
  MenuItem,
  MenuItemProps,
  Select,
  SelectProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledSelect = styled(Select)<Omit<SelectProps, "variant">>(
  () => ({
    color: "white",
    margin: "0",
    padding: "1.6rem 0.6rem",
    height: "3rem",
    borderRadius: "0.5rem",
    "&.Mui-focused": {
      backgroundColor: "#3A3334",
    },
    "&:hover": {
      backgroundColor: "#2b2728",
    },
    "& fieldset": {
      borderColor: "#1a1a1a !important",
    },
    "& .MuiSelect-outlined": {
      padding: "0",
    },
    "& span": {
      fontSize: "1rem",
      margin: "0 0.6rem 0 1rem",
      fontWeight: "800",
      lineHeight: "0.8rem",
    },
    "& p": {
      fontSize: "0.9rem",
      margin: "0 0.6rem 0 1rem",
    },
    "& legend": {
      display: "none",
    },
  })
);

export const StyledMenuItem = styled(MenuItem)<MenuItemProps>(() => ({
  color: "white",
  "& span": {
    fontSize: "0.9rem",
    marginLeft: "1rem",
    fontWeight: "800",
    lineHeight: "18px",
  },
  "& p": {
    fontSize: "0.8rem",
    marginLeft: "1rem",
    lineHeight: "18px",
    marginRight: "0",
  },
}));

export const StyledTypography = styled(Typography)<TypographyProps>(() => ({
  marginLeft: "0",
  height: "10px",
  fontSize: "1rem",
}));
