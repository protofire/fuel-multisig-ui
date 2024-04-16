import { Box, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

import { isValidAddress } from "@/validations/blockchain";

import { useTransferAssetContext } from "../TransferAssetContext";

export function FormTransferAsset() {
  const { inputFormManager, managerStep } = useTransferAssetContext();
  const {
    formState: { errors },
    control,
    setValue,
    getValues,
  } = inputFormManager;

  return (
    <Box>
      <Controller
        name="recipientAddress"
        control={control}
        rules={{
          required: "Recipient address is required",
          validate: {
            validAddress: (value) => {
              const error = isValidAddress(value);
              if (error) return error;

              return true;
            },
          },
        }}
        render={({ field }) => {
          console.log("__field", field);
          return (
            <TextField
              {...field}
              label={"Recipient Address *"}
              autoFocus
              fullWidth
              margin="normal"
              error={Boolean(errors["recipientAddress"])}
              helperText={errors.recipientAddress?.message}
            />
          );
        }}
      />

      <TextField
        label={"Recipient Address *"}
        // value={to}
        // onChange={(e) => {
        //   isInputDirty.current.address = true;
        //   setField("to", e.target.value);
        // }}
        autoFocus
        fullWidth
        margin="normal"
        // error={!!errors[0] && errors[0] !== initialErrorValue}
        // helperText={errors[0] !== initialErrorValue && errors[0]}
        // InputProps={{
        //   startAdornment: (
        //     <Avatar>
        //       <Identicon value={to} size={32} theme="polkadot" />
        //     </Avatar>
        //   ),
      />
    </Box>
  );
}
