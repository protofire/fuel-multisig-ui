import { Avatar, Box, Typography } from "@mui/material";
import BigNumber from "bignumber.js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { ROUTES } from "@/config/routes";
import { useDelay } from "@/hooks/common/useDelay";
import { useTransferAsset } from "@/hooks/multisigContract/useTransferAsset";
import { AccountSigner } from "@/sections/shared/AccountSigner";
import { NextBackButtonStepper } from "@/sections/shared/BaseStepper/NextBackButtonStepper";
import { toIdentityInput } from "@/services/contracts/transformers/toInputIdentity";
import { toAccountWalletItem } from "@/services/fuel/connectors/transformer";

import { FlexCenterBox, StyledBox, TypographyBodyStyled } from "../styled";
import { useTransferAssetContext } from "../TransferAssetContext";

export function ReviewAsset() {
  const { inputFormManager, managerStep } = useTransferAssetContext();
  const router = useRouter();
  const { activeStep, stepsLength, upStep, downStep } = managerStep;
  const { getValues, reset } = inputFormManager;
  const { recipientAddress, asset, amount, assetId } = getValues();
  const { isDelayFinished } = useDelay(500);
  const sendParams = useMemo(() => {
    const _amount = new BigNumber(amount)
      .multipliedBy(BigNumber(10).pow(asset?.decimals ?? 0))
      .toString();

    return {
      to: toIdentityInput(recipientAddress),
      params: {
        asset_id: { bits: assetId },
        value: _amount,
      },
    };
  }, [amount, asset?.decimals, assetId, recipientAddress]);
  const { send, isPending } = useTransferAsset({
    ...sendParams,
    onSuccess: () => {
      router.push(ROUTES.App);
      reset();
    },
  });

  const signAndSend = () => {
    send();
  };

  if (!asset)
    return (
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap={1}
        p={2}
      >
        <Typography>You need to select an asset previously.</Typography>
      </Box>
    );

  return (
    <Box display="flex" alignItems="center" flexDirection="column" gap={2}>
      <Box display="flex" justifyContent="center">
        <Typography variant="h4">Review</Typography>
        <StyledBox mt={5} mb={1} gap={4}>
          <FlexCenterBox>
            <Typography variant="h6" width={200}>
              To:
            </Typography>
            <Typography component="div">
              <AccountSigner
                owner={toAccountWalletItem(recipientAddress)}
                endlength={8}
              />
            </Typography>
          </FlexCenterBox>
          <FlexCenterBox>
            <Typography variant="h6" width={200}>
              Send:
            </Typography>
            <Typography
              display="flex"
              alignItems="center"
              gap={1}
              component="div"
            >
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
              <TypographyBodyStyled fontWeight="bold" variant="body1">
                {amount}
              </TypographyBodyStyled>
              <TypographyBodyStyled variant="body1">
                {asset.symbol ? asset.symbol : asset.name}
              </TypographyBodyStyled>
            </Typography>
          </FlexCenterBox>
        </StyledBox>
      </Box>

      <Box pt={5} display={"flex"} width={"100%"}>
        <NextBackButtonStepper
          activeStep={activeStep}
          stepsLength={stepsLength}
          handleBack={downStep}
          handleNext={signAndSend}
          nextLabel={<>Sign and send</>}
          nextButtonProps={{
            disabled: !isDelayFinished || isPending,
            isLoading: !isDelayFinished || isPending,
          }}
        />
      </Box>
    </Box>
  );
}
