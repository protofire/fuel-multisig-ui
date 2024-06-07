import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/config/routes";
import { useChangeThreshold } from "@/hooks/multisigContract/settings/useChangeThreshold";
import { ModalStyledDivider } from "@/sections/Auth/ModalWalletProvider/styled";
import { NextBackButtonStepper } from "@/sections/shared/BaseStepper/NextBackButtonStepper";
import { StyledBox } from "@/sections/TxQueueWidget/styled";

import { useSettingsMultisigContext } from "../../SettingsStepperContext/useSettingsMultisigContext";

export function ConfirmChangeThresholdStep() {
  const router = useRouter();
  const { multisigSelected, inputFormManager, managerStep } =
    useSettingsMultisigContext();
  const { activeStep, stepsLength, downStep } = managerStep;
  const { getValues, reset } = inputFormManager;
  const thresholdModified = getValues("threshold");
  const { proposeChangeThreshold, isPending } = useChangeThreshold({
    multisigAddress: multisigSelected?.address as string,
    onSuccess: () => {
      router.push(ROUTES.Transactions);
      reset();
      managerStep.resetSteps();
    },
  });

  const handleNext = () => {
    proposeChangeThreshold(thresholdModified);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent={{ xs: "flex-start", md: "center" }}
        flexDirection={"column"}
      >
        <StyledBox mt={3} mb={1} gap={2}>
          <Typography variant="h6">
            Threshold to be proposed to change
          </Typography>
          <Typography component="div">{`${thresholdModified}/${
            multisigSelected?.owners.length || 0
          }`}</Typography>
        </StyledBox>
        <ModalStyledDivider variant="middle" />
        <StyledBox>
          <Typography variant="h6" width={100}>
            Current Threshold
          </Typography>
          <Typography component="div">
            {`${multisigSelected?.threshold}/${
              multisigSelected?.owners.length || 0
            }`}
          </Typography>
        </StyledBox>
      </Box>
      <Box pt={5}>
        <NextBackButtonStepper
          activeStep={activeStep}
          stepsLength={stepsLength}
          handleBack={downStep}
          nextLabel={
            <>
              Propose
              <ArrowRightAltIcon />
            </>
          }
          handleNext={handleNext}
          nextButtonProps={{
            disabled: isPending,
            isLoading: isPending,
          }}
        />
      </Box>
    </Box>
  );
}
