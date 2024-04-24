import { Button, TextField, TextFieldProps } from "@mui/material";
import React from "react";

interface Props extends TextFieldProps<"outlined"> {
  onClickMax: () => void;
}

export const InputAmountWithMax = React.forwardRef<HTMLDivElement, Props>(
  function RefInputAmountWithMax({ value, onClickMax, ...props }, ref) {
    return (
      <TextField
        ref={ref}
        {...props}
        value={value}
        InputProps={{
          endAdornment: (
            <Button
              onClick={() => onClickMax?.()}
              sx={{ height: "1.5rem" }}
              variant="outlined"
            >
              MAX
            </Button>
          ),
          ...props.InputProps,
        }}
      />
    );
  }
);
