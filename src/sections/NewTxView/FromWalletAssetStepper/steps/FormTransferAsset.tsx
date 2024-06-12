import { useWallet } from "@fuels/react";
import {
  Avatar,
  Box,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import BigNumber from "bignumber.js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

import { ROUTES } from "@/config/routes";
import { useDelay } from "@/hooks/common/useDelay";
import { useMultisignatureAccountSelected } from "@/hooks/multisignatureSelected/useMultisignatureAccountSelected";
import { useAssetsInfoFinder, useGetBalance } from "@/hooks/useGetBalance";
import { NextBackButtonStepper } from "@/sections/shared/BaseStepper/NextBackButtonStepper";
import { InputAddress } from "@/sections/shared/common/muiExtended/InputAddress";
import { InputAmountWithMax } from "@/sections/shared/common/muiExtended/InputAmountWithMax";
import { validateAddress } from "@/validations/blockchain";

import { useFromWalletAssetContext } from "../FromWalletAssetContext";

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
  const { inputFormManager, managerStep } = useFromWalletAssetContext();
  const { activeStep, stepsLength, upStep, downStep } = managerStep;
  const {
    formState: { errors, isValid },
    control,
    setValue,
    getValues,
  } = inputFormManager;
  const { multisigSelected } = useMultisignatureAccountSelected();
  const { isDelayFinished } = useDelay(500);
  const { balance, assetInfo, formatted, isLoading } = useGetBalance();
  const { wallet } = useWallet();
  const router = useRouter();
  const { assetInfoFinder } = useAssetsInfoFinder();

  const amountMaxText = formatted || "0";

  useEffect(() => {
    if (!assetInfo || !balance?.toNumber()) return;

    setValue("assetId", assetInfo.assetId);
  }, [assetInfo, balance, setValue]);

  useEffect(() => {
    if (multisigSelected?.address) {
      setValue("recipientAddress", multisigSelected.address);
    }
  }, [multisigSelected, setValue]);

  if (!isDelayFinished) return <FormTransferSkeleton />;

  if (!assetInfo || !balance?.toNumber()) {
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
    setValue("amount", amountMax ? parseFloat(amountMax).toString() : "0", {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const transferFromWallet = async () => {
    if (!wallet || !multisigSelected?.address) return;
    const amount = getValues("amount");
    const _amount = new BigNumber(amount)
      .multipliedBy(BigNumber(10).pow(assetInfo?.decimals ?? 0))
      .toString();

    wallet
      .transferToContract(
        multisigSelected?.address,
        _amount,
        wallet.provider.getBaseAssetId()
      )
      .then((r) => {
        router.push(ROUTES.App);
      });
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column" gap={1}>
      <Controller
        name="recipientAddress"
        control={control}
        rules={{
          required: "Recipient Contract ID address is required",
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
              label={"Recipient Contract ID address*"}
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
                  field.onChange(e);
                  handleMax("0");
                }}
                sx={{ height: "3.7rem" }}
              >
                {[assetInfoFinder.baseAssetInfo].map((asset) => {
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
                            {amountMaxText}
                          </Typography>
                        </Box>
                      </Box>
                    </MenuItem>
                  );
                })}
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
          handleNext={transferFromWallet}
          nextButtonProps={{
            disabled: isLoading || !isValid,
            isLoading: isLoading,
          }}
        />
      </Box>
    </Box>
  );
}
