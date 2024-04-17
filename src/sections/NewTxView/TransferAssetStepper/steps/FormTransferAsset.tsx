import {
  Avatar,
  Box,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

import { useAssetsBalance } from "@/hooks/multisignatureSelected/useAssetsBalance";
import { InputAddress } from "@/sections/common/muiExtended/InputAddress";
import { InputAmountWithMax } from "@/sections/common/muiExtended/InputAmountWithMax";
import { NextBackButtonStepper } from "@/sections/shared/BaseStepper/NextBackButtonStepper";
import { validateAddress } from "@/validations/blockchain";

import { useTransferAssetContext } from "../TransferAssetContext";

export function FormTransferAsset() {
  const { inputFormManager, managerStep } = useTransferAssetContext();
  const { activeStep, stepsLength, upStep, downStep } = managerStep;
  const {
    formState: { errors, isValid },
    control,
    setValue,
    getValues,
  } = inputFormManager;
  const { balances, isLoading } = useAssetsBalance();

  useEffect(() => {
    if (!balances || !balances.length) return;

    setValue("assetId", balances[0].assetId);
  }, [balances, setValue]);

  if (isLoading || balances === undefined) {
    return (
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap={1}
        p={2}
      >
        {balances === undefined ? (
          <Typography>There are not assets to transfer.</Typography>
        ) : (
          <>
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
            />
          </>
        )}
      </Box>
    );
  }

  return (
    <Box display="flex" alignItems="center" flexDirection="column" gap={1}>
      <Controller
        name="recipientAddress"
        control={control}
        rules={{
          required: "Recipient address is required",
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
              label={"Recipient Address *"}
              autoFocus
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
                onChange={(e) => field.onChange(e)}
              >
                {balances.length === 0 ? (
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
