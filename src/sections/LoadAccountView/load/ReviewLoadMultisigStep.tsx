import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { APP_NAME } from "@/config/app";
import { ROUTES } from "@/config/routes";
import { useGetOwners } from "@/hooks/multisigContract/settings/useGetOwners";
import { useGetThreshold } from "@/hooks/multisigContract/settings/useGetThreshold";
import { updateOwners } from "@/hooks/multisignatureSelected/useMultisignatureAccountSelected";
import { useAddSignersAccount } from "@/hooks/storageMultisignatures/useAddSignersAccount";
import { AccountSigner } from "@/sections/shared/AccountSigner";
import { NextBackButtonStepper } from "@/sections/shared/BaseStepper/NextBackButtonStepper";
import { FlexCenterBox, StyledBox } from "@/sections/shared/BaseStepper/styled";
import CopyButton from "@/sections/shared/common/CopyButton";
import { FallbackSpinner } from "@/sections/shared/common/FallbackSpinner";
import NetworkBadge from "@/sections/shared/NetworkBadge";
import { FuelWalletIcon } from "@/services/fuel/connectors/icons/FuelWalletIcon";
import { toAccountWalletItem } from "@/services/fuel/connectors/transformer";

import { useLoadAccountContext } from "../LoadAccountContext";

export function ReviewLoadMultisigStep() {
  const router = useRouter();
  const { inputFormManager, managerStep, reset, chainInfo } =
    useLoadAccountContext();
  const { activeStep, stepsLength, downStep: handleBack } = managerStep;
  const { getValues, setValue } = inputFormManager;
  const { threshold, owners, deployedMultisigAddress, walletName } =
    getValues();
  const { isLoading: isLoadingThreshold } = useGetThreshold({
    contractId: deployedMultisigAddress,
    onSuccess: (_threshold) => setValue("threshold", _threshold),
  });
  const { isLoading: isLoadingOwners } = useGetOwners({
    contractId: deployedMultisigAddress,
    onSuccess: (_owners) => setValue("owners", updateOwners([], _owners)),
  });
  const { save, isLoading } = useAddSignersAccount();
  const ownersAccountWallet = useMemo(
    () => owners.map((o) => toAccountWalletItem(o.address)),
    [owners]
  );

  const _signAndSetup = () => {
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
  };

  if (isLoadingThreshold || isLoadingOwners) {
    <FallbackSpinner />;
  }

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
                  endlength={12}
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
          nextLabel={<>Load account</>}
          nextButtonProps={{
            disabled: isLoading || isLoadingOwners || isLoadingThreshold,
            isLoading: isLoading || isLoadingOwners || isLoadingThreshold,
          }}
        />
      </Box>
    </Box>
  );
}
