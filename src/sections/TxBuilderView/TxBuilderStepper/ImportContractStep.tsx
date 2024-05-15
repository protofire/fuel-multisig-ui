import { Box } from "@mui/material";

import { TextFieldWithLoading } from "@/sections/shared/common/muiExtended/TextFieldWithLoading/TextFieldWithLoading";

export function ImportContractStep() {
  return (
    <>
      <Box mt={3} display="flex" gap={1} flexDirection="column">
        <TextFieldWithLoading
          id="address"
          label="Address contract"
          //   {...register("address", [onlyAddress, isOnChain])}
          fullWidth
          autoFocus
          //   error={Boolean(errors["address"])}
          //   helperText={errors["address"] ? errors["address"] : ""}
          //   loading={isLoading}
        />
      </Box>
    </>
  );
}
