import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import { useCallback, useMemo } from "react";
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
import { MethodsForm } from "./MethodsForm";
import { BoxRow } from "./styled";
import { useAbiMethodSelector } from "./useAbiMethodSelector";

export function MethodSelectorStep() {
  const { inputFormManager, managerStep, metadataManager } =
    useTxBuilderContext();
  const {
    activeStep,
    stepsLength,
    downStep: handleBack,
    upStep: handleNext,
  } = managerStep;
  const { getValues, setValue, control, watch } = inputFormManager;
  const { contractAddress, metadataSource } = getValues();
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
  const abiMethodSelected = watch("abiMethodSelected");
  const abiSelectedParams = watch("abiMethodParams");
  const { selectedAbiMethod, selectedAbiMethodLoading } = useAbiMethodSelector({
    methodName: abiMethodSelected,
    metadataContract,
  });

  const _handleNext = useCallback(() => {
    console.log("__Sign");
  }, []);

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

  console.log("__printingParams", abiSelectedParams);

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
          name="abiMethodSelected"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="select-method-label">Select Method</InputLabel>

              <Select
                labelId="select-method-label"
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  //   setValue("abiMethodSelected", e.target.value);
                }}
                autoFocus
                label="Select Method"
              >
                {sortedAbiMessages.map((m) => (
                  <MenuItem key={m.selector} value={m.name}>
                    {m.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      )}
      {selectedAbiMethodLoading ? (
        <>
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
        </>
      ) : (
        selectedAbiMethod &&
        metadataContract && (
          <MethodsForm
            selectedAbiMethod={selectedAbiMethod}
            metadataContract={metadataContract}
          />
        )
      )}
      <Box p={5}>
        <NextBackButtonStepper
          activeStep={activeStep}
          stepsLength={stepsLength}
          handleBack={handleBack}
          handleNext={_handleNext}
          nextButtonProps={{
            disabled: !selectedAbiMethod || selectedAbiMethod.isReadOnly,
          }}
        />
      </Box>
    </Box>
  );
}
