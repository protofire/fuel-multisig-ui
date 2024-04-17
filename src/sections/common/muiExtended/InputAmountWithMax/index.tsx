import { Button, TextField, TextFieldProps } from "@mui/material";
import React from "react";

type Props = TextFieldProps<"outlined">;

export const InputAmountWithMax = React.forwardRef<HTMLDivElement, Props>(
  function RefInputAmountWithMax({ value, ...props }, ref) {
    return (
      <TextField
        ref={ref}
        {...props}
        InputProps={{
          endAdornment: (
            <Button
              onClick={() => alert("max")}
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
