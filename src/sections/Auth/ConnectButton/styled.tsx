"use client";
import { ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  LoadingButton,
  LoadingButtonProps,
} from "@/sections/common/LoadingButton";

type Props = LoadingButtonProps & Pick<ButtonProps, "ref">;

export const StyledConnectButton = styled(LoadingButton)<Props>(
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
