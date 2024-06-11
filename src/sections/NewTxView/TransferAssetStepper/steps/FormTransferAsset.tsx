import {
  Avatar,
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { Controller } from "react-hook-form";

import { useDelay } from "@/hooks/common/useDelay";
import { useAssetsBalance } from "@/hooks/multisignatureSelected/useAssetsBalance";
import { useMultisignatureAccountSelected } from "@/hooks/multisignatureSelected/useMultisignatureAccountSelected";
import { NextBackButtonStepper } from "@/sections/shared/BaseStepper/NextBackButtonStepper";
import { InputAddress } from "@/sections/shared/common/muiExtended/InputAddress";
import { InputAmountWithMax } from "@/sections/shared/common/muiExtended/InputAmountWithMax";
import { validateAddress } from "@/validations/blockchain";

import { useTransferAssetContext } from "../TransferAssetContext";

function FormTransferSkeleton() {
  return (
    <Box display={"flex"} flexDirection="column" gap={3}>
      <Skeleton
        animation="wave"
        variant="rounded"
        width={"20rem"}
        height={60}
      />
      <Skeleton
        animation="wave"
        variant="rounded"
        width={"20rem"}
        height={60}
        sx={{ marginBottom: "5rem" }}
      />
    </Box>
  );
}

export function FormTransferAsset() {
  const { inputFormManager, managerStep } = useTransferAssetContext();
  const { activeStep, stepsLength, upStep, downStep } = managerStep;
  const {
    formState: { errors, isValid },
    control,
    setValue,
    getValues,
    watch,
  } = inputFormManager;
  const isContractId = watch("isContractId");
  console.log("__is", isContractId);
  const { multisigSelected } = useMultisignatureAccountSelected();
  const { balances, isLoading } = useAssetsBalance({
    contractId: multisigSelected?.address,
  });
  const { assetId } = getValues();
  const { isDelayFinished } = useDelay(500);
  const amountMaxText = useMemo(() => {
    if (!balances) return "0";

    const assetSelected = balances.find(
      (assetBalance) => assetBalance.assetId === assetId
    );
    const amountSplitted = assetSelected?.amountFormatted.split(" ");

    return amountSplitted ? amountSplitted[0] : "0";
  }, [assetId, balances]);

  useEffect(() => {
    if (!balances || !balances.length) return;

    const _defaultAsset = balances[0];
    setValue("assetId", _defaultAsset.assetId);
    setValue("asset", _defaultAsset);
  }, [balances, setValue]);

  if (isLoading || !isDelayFinished) return <FormTransferSkeleton />;

  if (Array.isArray(balances) && balances.length === 0) {
    return (
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap={1}
        p={2}
      >
        <Typography>There are not assets to transfer.</Typography>
      </Box>
    );
  }

  const handleMax = (amountMax: string) => {
    setValue("amount", amountMax ? amountMax : "0", {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column" gap={1}>
      <Controller
        name="recipientAddress"
        control={control}
        rules={{
          required: `Recipient ${
            isContractId ? "contract ID" : ""
          } address is required`,
          validate: {
            validAddress: (value) => {
              const error = validateAddress(value);
              if (error) return error;

              return true;
            },
          },
        }}
        render={({ field }) => {
          return (
            <InputAddress
              {...field}
              variant="outlined"
              label={`Recipient ${isContractId ? "Contract ID" : ""} address *`}
              fullWidth
              margin="normal"
              error={Boolean(errors["recipientAddress"])}
              helperText={errors.recipientAddress?.message}
            />
          );
        }}
      />

      <Box display="flex" alignItems="center" gap={4}>
        <Controller
          name="amount"
          control={control}
          rules={{
            required: "Amount required",
          }}
          render={({ field }) => {
            return (
              <InputAmountWithMax
                {...field}
                label="Amount *"
                variant="outlined"
                error={Boolean(errors["amount"])}
                helperText={errors.amount?.message}
                onClickMax={() => handleMax(amountMaxText)}
              />
            );
          }}
        />
        <Controller
          name="assetId"
          control={control}
          rules={{
            required: "Asset is required",
          }}
          render={({ field }) => {
            return (
              <Select
                {...field}
                labelId="assetId-tx-asset"
                onChange={(e) => {
                  const _assetId = e.target.value;
                  balances &&
                    setValue(
                      "asset",
                      balances.find(
                        (assetBalance) => assetBalance.assetId === _assetId
                      )
                    );

                  field.onChange(e);
                  handleMax("0");
                }}
                sx={{ height: "3.7rem" }}
              >
                {!balances ? (
                  <MenuItem value="">No Asset</MenuItem>
                ) : (
                  balances?.map((asset) => {
                    return (
                      <MenuItem key={asset.assetId} value={asset.assetId}>
                        <Box display="flex" alignItems="center" gap={1}>
                          {asset.imageUrl ? (
                            <Avatar>
                              <Image
                                alt={String(asset.name)}
                                src={asset.imageUrl as string}
                                width={"24"}
                                height={"24"}
                              />
                            </Avatar>
                          ) : (
                            <Avatar>❓</Avatar>
                          )}
                          <Box flexDirection="column">
                            <Typography variant="body1">
                              {asset.symbol}
                            </Typography>
                            <Typography variant="body2">
                              {asset.amountFormatted}
                            </Typography>
                          </Box>
                        </Box>
                      </MenuItem>
                    );
                  })
                )}
              </Select>
            );
          }}
        />
      </Box>
      <Box display={"flex"} width={"100%"}>
        <Controller
          name="isContractId"
          control={control}
          render={({ field }) => {
            return (
              <FormControlLabel
                control={<Checkbox />}
                label="Contract ID address."
                checked={field.value}
                {...field}
              />
            );
          }}
        />
      </Box>

      <Box pt={5} display={"flex"} width={"100%"}>
        <NextBackButtonStepper
          activeStep={activeStep}
          stepsLength={stepsLength}
          hiddenBack={true}
          handleBack={downStep}
          handleNext={upStep}
          nextButtonProps={{
            disabled: isLoading || !isValid,
            isLoading: isLoading,
          }}
        />
      </Box>
    </Box>
  );
}
