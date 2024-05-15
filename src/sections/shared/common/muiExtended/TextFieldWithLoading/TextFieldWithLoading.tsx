import { CircularProgress, TextField, TextFieldProps } from "@mui/material";
import React from "react";

interface LoadingProp {
  loading?: boolean;
}

export type TextFieldWithLoadingProps = LoadingProp & TextFieldProps;

export const TextFieldWithLoading = React.forwardRef<
  HTMLInputElement,
  TextFieldWithLoadingProps
>(function TextFieldWithLoading(props, ref) {
  const { loading, ...otherProps } = props;

  return (
    <TextField
      {...otherProps}
      ref={ref}
      InputProps={{
        ...otherProps.InputProps,
        endAdornment: loading ? (
          <CircularProgress size={20} color="inherit" />
        ) : null,
      }}
    />
  );
});
