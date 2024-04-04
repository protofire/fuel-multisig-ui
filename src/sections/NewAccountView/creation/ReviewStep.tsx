import { Box, Typography } from "@mui/material";

import { APP_NAME } from "@/config/app";
import { useSetupMultisig } from "@/hooks/multisigContract/useSetupMultisigContract";
import CopyButton from "@/sections/common/CopyButton";
import { NextBackButtonStepper } from "@/sections/shared/BaseStepper/NextBackButtonStepper";
import { FlexCenterBox, StyledBox } from "@/sections/shared/BaseStepper/styled";

import { useCreateAccountContext } from "../CreateAccountContext";

export function ReviewStep() {
  //   const theme = useTheme();
  //   const { network } = usePolkadotContext();
  //   const { logo, name: networkName } = getChain(network);
  const { inputFormManager, managerStep } = useCreateAccountContext();
  const { activeStep, stepsLength, downStep: handleBack } = managerStep;
  const { getValues } = inputFormManager;
  const { threshold, owners, deployedMultisigAddress, walletName } =
    getValues();
  const { setupMultisig, isLoading } = useSetupMultisig({
    contractId: deployedMultisigAddress,
  });

  const signAndSetup = () => {
    setupMultisig(
      threshold,
      owners.map((o) => o.address)
    );
  };

  console.log("__wallet", deployedMultisigAddress);

  return (
    <Box>
      <Typography variant="h6" component="div" mt={1}>
        You&apos;re about to create a new {APP_NAME} Account and will have to
        confirm the transaction with your connected wallet.
      </Typography>
      <Box display="flex" justifyContent={{ xs: "flex-start", md: "center" }}>
        <StyledBox mt={3} mb={1} gap={2}>
          <FlexCenterBox>
            <Typography variant="h6" width={100}>
              Network
            </Typography>
            {/* <NetworkBadge
              logo={logo.src}
              description={logo.alt}
              logoSize={{ width: 20, height: 20 }}
              name={networkName}
              showTooltip={false}
            /> */}
          </FlexCenterBox>
          <FlexCenterBox>
            <Typography variant="h6" width={100}>
              Name
            </Typography>
            <Typography
              display="flex"
              alignItems="center"
              gap={1}
              component="div"
            >
              <Typography fontWeight="bold" variant="body1">
                {walletName}
              </Typography>
              <CopyButton text={walletName} />
            </Typography>
          </FlexCenterBox>
          <FlexCenterBox>
            <Typography variant="h6" width={100}>
              Owners
            </Typography>
            {/* <Typography component="div">
              {owners.map((owner) => (
                <AccountSigner
                  key={owner.address}
                  name={owner.name}
                  address={owner.address}
                  truncateAmount={12}
                />
              ))}
            </Typography> */}
          </FlexCenterBox>
          <FlexCenterBox>
            <Typography variant="h6" width={100}>
              Threshold
            </Typography>
            <Typography variant="body1">
              {threshold} out of {owners.length} owner(s)
            </Typography>
          </FlexCenterBox>
        </StyledBox>
      </Box>
      <Box pt={5}>
        <NextBackButtonStepper
          activeStep={activeStep}
          stepsLength={stepsLength}
          handleBack={handleBack}
          handleNext={signAndSetup}
          nextButtonProps={{
            disabled: isLoading,
            isLoading: isLoading,
          }}
        />
      </Box>
    </Box>
  );
}
