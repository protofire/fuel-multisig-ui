import { Button, TextField, TextFieldProps } from "@mui/material";

type Props = TextFieldProps<"outlined">;

export function InputAmountWithMax({ value, ...props }: Props) {
  return (
    <TextField
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
