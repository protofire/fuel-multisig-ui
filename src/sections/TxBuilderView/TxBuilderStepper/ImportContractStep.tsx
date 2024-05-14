import { Box, FormControl, FormHelperText } from "@mui/material";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

import { useFormatAccountWalletItem } from "@/context/FormatAccountWalletItem/useFormatAccountWalletItem";
import { NextBackButtonStepper } from "@/sections/shared/BaseStepper/NextBackButtonStepper";
import { DropzoneWrapper } from "@/sections/shared/common/muiExtended/DropzoneWrapper";
import { TextFieldWithLoading } from "@/sections/shared/common/muiExtended/TextFieldWithLoading/TextFieldWithLoading";
import { InputFileDropzone } from "@/sections/shared/InputFileDropzone";
import { getAccountWallet } from "@/services/fuel/connectors/transformer";
import { validateAddress } from "@/validations/blockchain";

import { useTxBuilderContext } from "../TxBuilderContext/useTxBuilderContext";

export function ImportContractStep() {
  const { inputFormManager, managerStep, metadataManager } =
    useTxBuilderContext();
  const {
    activeStep,
    stepsLength,
    downStep: handleBack,
    upStep: handleNext,
  } = managerStep;
  const { metadataFile, onChange, onRemove, metadata } = metadataManager;
  const { isB256Activated } = useFormatAccountWalletItem();
  const {
    control,
    formState: { isValid, errors },
    getValues,
    setValue,
    resetField,
  } = inputFormManager;
  const { contractAddress } = getValues();

  useEffect(() => {
    const { contractAddress: _address } = getValues();
    const error = validateAddress(_address);
    if (error) return;

    const _contractAddress = getAccountWallet(_address);
    const formattedAddress = isB256Activated
      ? _contractAddress.b256
      : _contractAddress.bech32;

    setValue("contractAddress", formattedAddress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isB256Activated]);

  useEffect(() => {
    if (!metadata.isSupplied || !metadata.source) return;

    setValue("metadataSource", metadata.source);
  }, [metadata.isSupplied, metadata.isValid, metadata.source, setValue]);

  const _onRemove = () => {
    onRemove();
    resetField("metadataSource");
  };

  return (
    <>
      <Box mt={3} display="flex" gap={1} flexDirection="column">
        <Controller
          name={`contractAddress`}
          control={control}
          rules={{
            required: "Address is required.",
            validate: {
              validAddress: (value) => {
                const error = validateAddress(value);
                if (error) return error;

                return true;
              },
            },
          }}
          render={({ field, fieldState }) => (
            <TextFieldWithLoading
              required
              label="Address contract"
              fullWidth
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />
        <FormControl fullWidth={true} sx={{ marginBottom: 3, marginTop: 3 }}>
          <DropzoneWrapper>
            <InputFileDropzone
              label="Drop ABI metadata file or click to select it"
              accept={{ "application/json": [".json"] }}
              file={metadataFile}
              onChange={onChange}
              onRemove={_onRemove}
              disabled={!contractAddress || Boolean(errors.contractAddress)}
            />
          </DropzoneWrapper>
          {errors.metadataSource && (
            <FormHelperText error id={`error-metadata-source`}>
              {errors.metadataSource?.message}
            </FormHelperText>
          )}
        </FormControl>
      </Box>
      <Box pt={5}>
        <NextBackButtonStepper
          activeStep={activeStep}
          stepsLength={stepsLength}
          handleBack={handleBack}
          handleNext={handleNext}
          hiddenBack={true}
          nextButtonProps={{
            disabled: !isValid || !metadata.isValid,
            isLoading: false,
          }}
        />
      </Box>
    </>
  );
}
