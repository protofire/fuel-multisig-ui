import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Controller, useFieldArray } from "react-hook-form";

import { APP_NAME } from "@/config/app";
import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { useEffectOnceIf } from "@/hooks/common/useEffectOnceIf";
import { FuelExplorerLink } from "@/sections/common/ExplorerLink/FuelExplorerLink";
import { MonoTypography } from "@/sections/common/MonoTypography";
import { NextBackButtonStepper } from "@/sections/shared/BaseStepper/NextBackButtonStepper";
import { StyledBox } from "@/sections/shared/BaseStepper/styled";
import { truncateAddress } from "@/utils/formatString";

import { useCreateAccountContext } from "../CreateAccountContext";

export function OwnersStep() {
  const { accountConnected } = useNetworkConnection();
  const { inputFormManager, managerStep } = useCreateAccountContext();
  const {
    activeStep,
    stepsLength,
    downStep: handleBack,
    upStep: handleNext,
  } = managerStep;
  const {
    control,
    getValues,
    watch,
    setValue,
    formState: { isValid },
  } = inputFormManager;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "owners",
  });
  const { deployedMultisigAddress } = getValues();

  const ownersCount = watch("owners").length;

  useEffectOnceIf(() => {
    setValue("owners", [
      {
        address: accountConnected as string,
        name: `Creator_${accountConnected?.slice(-4)}`,
      },
    ]);
  }, ownersCount === 0 && accountConnected !== undefined);

  const addOwner = () => {
    append({ name: `Signer ${ownersCount + 1}`, address: "" });
  };

  const _handleNext = () => {
    if (isValid) {
      handleNext();
    }
  };

  return (
    <Box>
      <Typography variant="h6" component="div" mt={1}>
        Set the owner wallets of your {APP_NAME} Account{" "}
        {
          <MonoTypography variant="caption" sx={{ mr: "0.3rem" }}>
            {truncateAddress(deployedMultisigAddress, 6, 4)}
            <FuelExplorerLink hash={deployedMultisigAddress} />
          </MonoTypography>
        }
        and how many need to confirm to execute a valid transaction.
      </Typography>
      <StyledBox
        mt={2}
        sx={{
          maxHeight: 300,
          overflowY: "auto",
        }}
        mb={5}
      >
        {fields.map((field, index) => (
          <Box key={field.id} mb={1} mt={2}>
            <Box display="flex" gap={1} alignItems="center" mb={1}>
              <Controller
                name={`owners.${index}.name`}
                rules={{
                  required: "Enter a name to identify it",
                }}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    label="Owner name"
                    {...field}
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name={`owners.${index}.address`}
                control={control}
                rules={{
                  required: "Address is required.",
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

              <IconButton disabled={index === 0} onClick={() => remove(index)}>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
        <Button
          variant="text"
          sx={{ justifyContent: "flex-start", width: "150px", fontSize: 14 }}
          onClick={addOwner}
        >
          + Add new owner
        </Button>
      </StyledBox>
      <StyledBox>
        <Box mb={1}>
          <Typography
            fontWeight="bold"
            display="flex"
            alignItems="center"
            gap={0.5}
            component="div"
          >
            Threshold
            <Tooltip
              placement="right"
              title="Signatures required to execute a transaction"
            >
              <HelpOutlineIcon fontSize="small" />
            </Tooltip>
          </Typography>
          <Typography variant="h6">
            Any transaction requires the confirmation of:
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Controller
            name="threshold"
            control={control}
            render={({ field }) => (
              <Select
                labelId="threshold-label"
                {...field}
                onChange={(e) => field.onChange(e)}
              >
                {fields.map((_, index) => (
                  <MenuItem key={index} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
            )}
          />

          <Typography variant="body1">out of {ownersCount} owner(s)</Typography>
        </Box>
      </StyledBox>
      <Box pt={5}>
        <NextBackButtonStepper
          activeStep={activeStep}
          stepsLength={stepsLength}
          handleBack={handleBack}
          handleNext={_handleNext}
          nextButtonProps={{
            disabled: !isValid,
            isLoading: false,
          }}
        />
      </Box>
    </Box>
  );
}
