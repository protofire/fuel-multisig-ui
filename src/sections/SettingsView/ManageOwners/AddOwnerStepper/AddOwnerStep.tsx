import { Box, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

import { ROUTES } from "@/config/routes";
import { NextBackButtonStepper } from "@/sections/shared/BaseStepper/NextBackButtonStepper";
import { StyledBox } from "@/sections/shared/BaseStepper/styled";
import { pluralizeVerb } from "@/utils/formatString";
import { validateAddress } from "@/validations/blockchain";
import { isAddressDuplicated } from "@/validations/owners";

import { useSettingsMultisigContext } from "../../SettingsStepperContext/useSettingsMultisigContext";

export function AddOwnerStep() {
  const { multisigSelected, inputFormManager, managerStep } =
    useSettingsMultisigContext();
  const { activeStep, stepsLength, upStep } = managerStep;
  const router = useRouter();
  const { control, setValue, getValues, setFocus } = inputFormManager;
  const owner = getValues("owner");
  const ownersAmount = multisigSelected?.owners.length || 0;
  const ownerNumber = ownersAmount + 1;

  useEffect(() => {
    if (owner) return;

    setValue("owner", {
      address: "",
      name: `Signer ${ownerNumber}`,
    });
  }, [owner, ownerNumber, setValue]);

  return (
    <Box>
      <StyledBox
        mt={2}
        sx={{
          maxHeight: 300,
          overflowY: "auto",
        }}
        mb={5}
      >
        <Typography variant="h4">{`Add owner ${ownerNumber} of the ${ownersAmount} existing ${pluralizeVerb(
          ownersAmount,
          "one"
        )}`}</Typography>

        <Box mt={3} display="flex" gap={1} alignItems="center" mb={1}>
          <Controller
            name={`owner.name`}
            rules={{
              required: "Enter a name to identify it",
            }}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Owner name"
                {...field}
                focused
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name={`owner.address`}
            control={control}
            rules={{
              required: "Address is required.",
              validate: {
                validAddress: (value) => {
                  const error = validateAddress(value);
                  if (error) return error;

                  return true;
                },
                unique: (value) => {
                  const error = isAddressDuplicated(
                    value,
                    ownerNumber,
                    multisigSelected?.owners || []
                  );
                  if (error) return error;

                  return true;
                },
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                label="Owner address"
                fullWidth
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </Box>
      </StyledBox>
      <Box pt={5}>
        <NextBackButtonStepper
          activeStep={activeStep}
          stepsLength={stepsLength}
          handleBack={() => router.push(ROUTES.Settings)}
          handleNext={upStep}
          // nextButtonProps={{
          //   disabled: !isValid,
          //   isLoading: false,
          // }}
        />
      </Box>
    </Box>
  );
}
