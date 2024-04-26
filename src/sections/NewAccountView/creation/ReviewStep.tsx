import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { APP_NAME } from "@/config/app";
import { ROUTES } from "@/config/routes";
import { useSetupMultisig } from "@/hooks/multisigContract/useSetupMultisigContract";
import { useAddSignersAccount } from "@/hooks/storageMultisignatures/useAddSignersAccount";
import CopyButton from "@/sections/common/CopyButton";
import { AccountSigner } from "@/sections/shared/AccountSigner";
import { NextBackButtonStepper } from "@/sections/shared/BaseStepper/NextBackButtonStepper";
import { FlexCenterBox, StyledBox } from "@/sections/shared/BaseStepper/styled";
import NetworkBadge from "@/sections/shared/NetworkBadge";
import { FuelWalletIcon } from "@/services/fuel/connectors/icons/FuelWalletIcon";
import { toAccountWalletItem } from "@/services/fuel/connectors/transformer";

import { useCreateAccountContext } from "../CreateAccountContext";

export function ReviewStep() {
  const router = useRouter();
  const { inputFormManager, managerStep, reset, chainInfo } =
    useCreateAccountContext();
  const { activeStep, stepsLength, downStep: handleBack } = managerStep;
  const { getValues } = inputFormManager;
  const { threshold, owners, deployedMultisigAddress, walletName } =
    getValues();
  const { setupMultisig, isLoading } = useSetupMultisig({
    contractId: deployedMultisigAddress,
  });
  const { save } = useAddSignersAccount();
  const ownersAccountWallet = useMemo(
    () => owners.map((o) => toAccountWalletItem(o.address)),
    [owners]
  );

  const _signAndSetup = () => {
    setupMultisig(
      threshold,
      owners.map((o) => o.address)
    ).then((result) => {
      // if (!result) return;

      save({
        account: {
          address: deployedMultisigAddress,
          owners,
          name: walletName,
          networkId: chainInfo.chainId,
          threshold,
        },
        options: {
          onSuccess: () => {
            router.push(ROUTES.App);
            reset();
          },
        },
      });
    });
  };

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
            <NetworkBadge
              name={chainInfo.name}
              description={chainInfo.name}
              tooltipInfo="This network is the one that has been selected in the wallet provider"
            >
              <FuelWalletIcon />
            </NetworkBadge>
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
            <Typography component="div">
              {ownersAccountWallet.map((owner) => (
                <AccountSigner
                  key={owner.address.b256}
                  owner={owner}
                  truncateAmount={12}
                />
              ))}
            </Typography>
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
          handleNext={_signAndSetup}
          nextLabel={<>Sign and setup</>}
          nextButtonProps={{
            disabled: isLoading,
            isLoading: isLoading,
          }}
        />
      </Box>
    </Box>
  );
}
