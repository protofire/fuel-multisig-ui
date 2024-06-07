import { Box, Stack, TextField } from "@mui/material";
import { Contract } from "fuels";
import { Controller } from "react-hook-form";

import { UseCustomContractDryRunHandlerResult } from "@/hooks/useContractDryRunHandler";
import { DryRunMessage } from "@/sections/shared/DryRunMessage";
import { useTxBuilderContext } from "@/sections/TxBuilderView/TxBuilderContext/useTxBuilderContext";

import { UseAbiMethodSelectorResult } from "./useAbiMethodSelector";

interface Props extends UseCustomContractDryRunHandlerResult {
  selectedAbiMethod: UseAbiMethodSelectorResult["selectedAbiMethod"];
  metadataContract: Contract;
}

export function MethodsForm({ selectedAbiMethod, decodedValue }: Props) {
  const { inputFormManager } = useTxBuilderContext();
  const thereAreAttributes =
    selectedAbiMethod?.interfaceMethod?.jsonFn.inputs.length || false;
  const {
    control,
    formState: { isValid, errors },
    getValues,
    setValue,
    resetField,
  } = inputFormManager;

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
      paddingTop={2}
    >
      <Box minWidth="50%">
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <DryRunMessage
              error={undefined}
              outcome={decodedValue}
              isRunning={false}
            />
          </Box>
          {thereAreAttributes && (
            <Controller
              name={"abiMethodParams"}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  required
                  label="Params in Hexadecimal"
                  fullWidth
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          )}
        </>
      </Box>
    </Stack>
  );
}
