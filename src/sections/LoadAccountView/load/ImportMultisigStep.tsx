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
import { useByOwnerSignersAccount } from "@/hooks/storageMultisignatures/useByOwnerSignersAccount";
import { useAccountWalletSelected } from "@/hooks/useAccountWalletSelected";
import { NextBackButtonStepper } from "@/sections/shared/BaseStepper/NextBackButtonStepper";
import NetworkBadge from "@/sections/shared/NetworkBadge";
import { FuelWalletIcon } from "@/services/fuel/connectors/icons/FuelWalletIcon";
import { generateHashName } from "@/services/fuel/getHashName";
import { validateAddress } from "@/validations/blockchain";
import { isAddressDuplicated } from "@/validations/owners";

import { useLoadAccountContext } from "../LoadAccountContext";

export function ImportMultisigStep() {
  const { accountConnected } = useNetworkConnection();
  const { inputFormManager, managerStep, chainInfo, accountsCount } =
    useLoadAccountContext();
  const {
    activeStep,
    stepsLength,
    downStep: handleBack,
    upStep: handleNext,
  } = managerStep;
  const {
    formState: { errors, isValid },
    control,
    setValue,
    getValues,
  } = inputFormManager;
  const { accountWalletItem } = useAccountWalletSelected();
  const { deployedMultisigAddress, walletName } = getValues();
  const { multisigs } = useByOwnerSignersAccount();

  useEffect(() => {
    if (!accountConnected || !accountWalletItem?.address.b256) return;

    setValue(
      "walletName",
      generateHashName(`${accountWalletItem?.address.b256}${accountsCount}`)
    );
  }, [
    setValue,
    accountConnected,
    accountWalletItem?.address.b256,
    accountsCount,
  ]);

  const _handleNext = () => {
    if (deployedMultisigAddress) {
      handleNext();
      return;
    }
  };

  if (!multisigs) return null;

  return (
    <Box mt={3} display="flex" gap={1} flexDirection="column">
      <Box display="flex" alignItems="center" gap={1.25}>
        <Typography variant="body1" component="p">
          You are on
        </Typography>
        <NetworkBadge
          name={chainInfo.name}
          logoSize={{ width: 20, height: 20 }}
          description={chainInfo.name}
          tooltipInfo="This network is the one that has been selected in the wallet provider"
        >
          <FuelWalletIcon />
        </NetworkBadge>
      </Box>
      <Controller
        name="deployedMultisigAddress"
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
              const error = isAddressDuplicated(value, multisigs);
              if (error) return "The account is already loaded";

              return true;
            },
          },
        }}
        render={({ field, fieldState }) => (
          <TextField
            id="draft-deployed-address"
            label="Multisignature deployed address"
            fullWidth
            margin="normal"
            autoFocus
            {...field}
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
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
        )}
      />

      <Controller
        name="walletName"
        control={control}
        rules={{ required: "Wallet name is required" }}
        render={({ field }) => (
          <TextField
            id="walletName"
            label="Multisig account name"
            fullWidth
            margin="normal"
            error={Boolean(errors["walletName"])}
            helperText={errors.walletName?.message}
            {...field}
          />
        )}
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
            disabled: !isValid,
          }}
        />
      </Box>
    </Box>
  );
}
