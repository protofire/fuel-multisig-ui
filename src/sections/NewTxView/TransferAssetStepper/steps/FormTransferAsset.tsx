import { Box } from "@mui/material";
import { Controller } from "react-hook-form";

import { InputAddress } from "@/sections/common/muiExtended/InputAddress";
import { InputAmountWithMax } from "@/sections/common/muiExtended/InputAmountWithMax";
import { validateAddress } from "@/validations/blockchain";

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
    <Box display="block" alignItems="center" flexDirection="column" gap={1}>
      <Controller
        name="recipientAddress"
        control={control}
        rules={{
          required: "Recipient address is required",
          validate: {
            validAddress: (value) => {
              const error = validateAddress(value);
              if (error) return error;

              return true;
            },
          },
        }}
        render={({ field }) => {
          return (
            <InputAddress
              {...field}
              variant="outlined"
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

      <Box display="flex" alignItems="center" gap={4}>
        <InputAmountWithMax
          label="Amount *"
          variant="outlined"
          // value={inputValue}
          // maxValue={maxAmount || ""}
          // defaultValue="0"
          // onValueChange={handleValueChange}
          // error={!!errors[1] && errors[1] !== initialErrorValue}
          // helperText={errors[1] !== initialErrorValue && errors[1]}
        />
      </Box>
    </Box>
  );
}
