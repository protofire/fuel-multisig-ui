import { Box, Stack, TextField, Typography } from "@mui/material";
import { Contract } from "fuels";
import { Controller } from "react-hook-form";

import { useTxBuilderContext } from "../../TxBuilderContext/useTxBuilderContext";
import { UseAbiMethodSelectorResult } from "./useAbiMethodSelector";

interface Props {
  selectedAbiMethod: UseAbiMethodSelectorResult["selectedAbiMethod"];
  metadataContract: Contract;
}

export function MethodsForm({ selectedAbiMethod, metadataContract }: Props) {
  const { inputFormManager } = useTxBuilderContext();
  const thereAreAttributes =
    selectedAbiMethod?.interfaceMethod?.attributes.length || 0;
  const {
    control,
    formState: { isValid, errors },
    getValues,
    setValue,
    resetField,
  } = inputFormManager;

  console.log("__selected", selectedAbiMethod?.interfaceMethod);

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
            {thereAreAttributes && (
              <Typography variant="caption" fontWeight="500">
                Message to send:
              </Typography>
            )}
            {/* <DryRunMessage
              error={errorDryrun}
              outcome={outcomeDryRun}
              isRunning={isDryRunning}
            /> */}
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
