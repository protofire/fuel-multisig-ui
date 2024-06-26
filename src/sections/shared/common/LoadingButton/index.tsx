import Box from "@mui/material/Box";
import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import * as React from "react";

export interface LoadingButtonProps extends Omit<ButtonProps, "ref"> {
  isLoading?: boolean;
}

export const LoadingButton: React.FC<LoadingButtonProps> = React.forwardRef<
  HTMLButtonElement,
  LoadingButtonProps
>(function RefLoadingButton({ isLoading, children, ...props }, ref) {
  const theme = useTheme();
  return (
    <Button
      ref={ref}
      disabled={isLoading}
      sx={{ position: "relative" }}
      {...props}
    >
      <Box
        sx={{
          visibility: isLoading ? "hidden" : "visible",
        }}
      >
        {children}
      </Box>
      {isLoading && (
        <CircularProgress
          size={24}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px", // half of size
            marginLeft: "-12px", // half of size
            color: theme.palette.common.black,
          }}
        />
      )}
    </Button>
  );
});
