import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { Controller } from "react-hook-form";

import { useMultisignatureAccountSelected } from "@/hooks/multisignatureSelected/useMultisignatureAccountSelected";
import { useAddressInFormatPicked } from "@/hooks/useAddressInFormatPicked";
import { useContractFromMetadata } from "@/hooks/useContractFromMetadata";
import { NextBackButtonStepper } from "@/sections/shared/BaseStepper/NextBackButtonStepper";
import CopyButton from "@/sections/shared/common/CopyButton";
import { FallbackSpinner } from "@/sections/shared/common/FallbackSpinner";
import { MonoTypography } from "@/sections/shared/common/MonoTypography";
import { truncateAddress } from "@/utils/formatString";

import { useTxBuilderContext } from "../../TxBuilderContext/useTxBuilderContext";
import { BoxRow } from "./styled";

export function MethodSelectorStep() {
  const { inputFormManager, managerStep, metadataManager } =
    useTxBuilderContext();
  const {
    activeStep,
    stepsLength,
    downStep: handleBack,
    upStep: handleNext,
  } = managerStep;
  const { getValues, setValue, control } = inputFormManager;
  const { contractAddress, metadataSource, abiMethodSelector } = getValues();
  const { addressFormatted } = useAddressInFormatPicked({
    accountWallet: contractAddress,
  });
  const { multisigSelected } = useMultisignatureAccountSelected();
  const { contract: metadataContract } = useContractFromMetadata({
    contractId: contractAddress,
    jsonAbi: metadataSource,
    walletAddress: multisigSelected?.address,
  });
  const sortedAbiMessages = useMemo(
    () =>
      metadataContract && Object.values(metadataContract.interface.functions),
    [metadataContract]
  );

  if (!metadataContract) {
    return (
      <FallbackSpinner
        sx={{
          justifyContent: "start",
          height: "auto",
        }}
        text="Getting the Contract information..."
      />
    );
  }

  return (
    <Box mt={3} display="flex" gap={1} flexDirection="column">
      <BoxRow
        flexDirection="row"
        display={"flex"}
        gap={1}
        alignItems={"center"}
        paddingBottom={3}
      >
        <Typography variant="caption" fontWeight="500">
          Contract Address:
        </Typography>
        <BoxRow>
          <MonoTypography variant="body1">
            {truncateAddress(addressFormatted)}
          </MonoTypography>
          <CopyButton text={addressFormatted} />
        </BoxRow>
      </BoxRow>
      {sortedAbiMessages?.length && (
        <Controller
          name="abiMethodSelector"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="select-method-label">Select Method</InputLabel>

              <Select
                labelId="select-method-label"
                {...field}
                onChange={(e) => field.onChange(e)}
                autoFocus
                label="Select Method"
              >
                {sortedAbiMessages.map((m, index) => (
                  <MenuItem key={index} value={m.name}>
                    {m.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      )}
      <Box p={5}>
        <NextBackButtonStepper
          activeStep={activeStep}
          stepsLength={stepsLength}
          handleBack={handleBack}
          handleNext={handleNext}
          nextButtonProps={{
            disabled: !abiMethodSelector,
          }}
        />
      </Box>
    </Box>
  );
}
