import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Box, MenuItem, Select, Tooltip, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";

import { ROUTES } from "@/config/routes";
import { useRecentlyClicked } from "@/hooks/common/useRecentlyClicked";
import { NextBackButtonStepper } from "@/sections/shared/BaseStepper/NextBackButtonStepper";
import { StyledBox } from "@/sections/shared/BaseStepper/styled";
import { pluralizeVerb } from "@/utils/formatString";

import { useSettingsMultisigContext } from "../../SettingsStepperContext/useSettingsMultisigContext";

export function ChangeThresholdStep() {
  const router = useRouter();
  const { multisigSelected, inputFormManager, managerStep } =
    useSettingsMultisigContext();
  const ownersCount = multisigSelected?.owners.length || 0;
  const { activeStep, stepsLength, upStep: handleNext } = managerStep;
  const {
    control,
    formState: { errors, isValid },
    watch,
  } = inputFormManager;
  const thresholdModified = watch("threshold");
  const { ref: refButton, recentlyClicked } = useRecentlyClicked(1500);

  return (
    <Box>
      <Typography variant="h4">{`Propose the necessary confirmations to "${thresholdModified}"`}</Typography>
      <StyledBox
        mt={2}
        sx={{
          maxHeight: 300,
          overflowY: "auto",
        }}
      >
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
            rules={{
              required: "This field is required",
              validate: (value) =>
                value !== multisigSelected?.threshold ||
                "The number must not be 42",
            }}
            render={({ field }) => (
              <Select
                labelId="threshold-label"
                {...field}
                onChange={(e) => field.onChange(e)}
              >
                {multisigSelected?.owners.map((_, index) => (
                  <MenuItem key={index} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
            )}
          />

          <Typography variant="body1">
            out of {ownersCount} {pluralizeVerb(ownersCount, "owner")}
          </Typography>
        </Box>
      </StyledBox>
      <Box pt={5}>
        <NextBackButtonStepper
          activeStep={activeStep}
          stepsLength={stepsLength}
          handleBack={() => router.push(ROUTES.Settings)}
          handleNext={handleNext}
          backLabel="Cancel"
          nextButtonProps={{
            disabled: Boolean(errors.threshold) || !isValid,
          }}
          backButtonProps={{
            ref: refButton,
            disabled: recentlyClicked,
            isLoading: recentlyClicked,
          }}
        />
      </Box>
    </Box>
  );
}
