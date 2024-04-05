import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { useDeployMultisigContract } from "@/hooks/multisigContract/useDeployMultisigContract";
import { useDraftMultisigDeployed } from "@/hooks/multisigContract/useDraftMultisigDeployed";
import { useAccountWalletItem } from "@/hooks/useGetProviderrWalletSelected";
import { NextBackButtonStepper } from "@/sections/shared/BaseStepper/NextBackButtonStepper";
import NetworkBadge from "@/sections/shared/NetworkBadge";
import { FuelWalletIcon } from "@/services/fuel/connectors/icons/FuelWalletIcon";
import { generateHashName } from "@/services/fuel/getHashName";

import { useCreateAccountContext } from "../CreateAccountContext";

export function MultisigCreationStep() {
  const { chainInfo, accountConnected } = useNetworkConnection();
  const chainName = chainInfo?.name || "";
  const { inputFormManager, managerStep } = useCreateAccountContext();
  const {
    activeStep,
    stepsLength,
    downStep: handleBack,
    upStep: handleNext,
  } = managerStep;
  const {
    formState: { errors },
    control,
    setValue,
    getValues,
  } = inputFormManager;
  const { accountWalletItem } = useAccountWalletItem();
  const { deployContract, isLoading: isDeploying } =
    useDeployMultisigContract();
  const { deployedMultisigAddress } = getValues();
  const { setDeployedMultisig } = useDraftMultisigDeployed();

  useEffect(() => {
    if (!accountConnected || !accountWalletItem?.address.hex) return;

    setValue("walletName", generateHashName(accountWalletItem?.address.hex));
  }, [setValue, accountConnected, accountWalletItem?.address.hex]);

  const _handleNext = () => {
    if (deployedMultisigAddress) {
      handleNext();
      return;
    }

    deployContract().then((value) => {
      if (value) {
        setValue("deployedMultisigAddress", value);
        handleNext();
      }
    });
  };

  return (
    <Box mt={3} display="flex" gap={1} flexDirection="column">
      <Box display="flex" alignItems="center" gap={1.25}>
        <Typography variant="body1" component="p">
          You are on
        </Typography>
        <NetworkBadge
          name={chainName}
          logoSize={{ width: 20, height: 20 }}
          description={chainName}
          tooltipInfo="This network is the one that has been selected in the wallet provider"
        >
          <FuelWalletIcon />
        </NetworkBadge>
      </Box>
      <Controller
        name="walletName"
        control={control}
        rules={{ required: "Wallet name is required" }}
        render={({ field }) => (
          <TextField
            id="walletName"
            label="Multisig account name"
            autoFocus
            fullWidth
            margin="normal"
            error={Boolean(errors["walletName"])}
            helperText={errors.walletName?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="deployedMultisigAddress"
        control={control}
        render={({ field }) =>
          field.value ? (
            <TextField
              id="draft-deployed-address"
              label="Draft account deployed address"
              fullWidth
              margin="normal"
              disabled
              {...field}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setDeployedMultisig(null);
                        field.onChange("");
                      }}
                      edge="end"
                      size="small"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          ) : (
            <></>
          )
        }
      />

      <Box mt={4}>
        <Typography
          variant="caption"
          component="p"
          display="flex"
          alignItems="center"
          gap={0.5}
          sx={{ fontSize: "0.875rem" }}
        >
          By continuing, you agree to our
          <Link href="#">terms of use</Link>
          and
          <Link href="#"> privacy policy.</Link>
        </Typography>
      </Box>
      <Box pt={5}>
        <NextBackButtonStepper
          activeStep={activeStep}
          stepsLength={stepsLength}
          handleBack={handleBack}
          handleNext={_handleNext}
          hiddenBack={activeStep === 0 ? true : false}
          nextLabel={deployedMultisigAddress ? "Next →" : "Deploy →"}
          nextButtonProps={{
            disabled: Boolean(errors["walletName"]),
            isLoading: isDeploying,
          }}
        />
      </Box>
    </Box>
  );
}
