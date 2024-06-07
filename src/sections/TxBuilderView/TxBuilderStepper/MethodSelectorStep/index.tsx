import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import BigNumber from "bignumber.js";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";

import { BASE_ASSET_ID } from "@/config/assetsMap";
import { ROUTES } from "@/config/routes";
import { useProposeTransaction } from "@/hooks/multisigContract/useProposeTransaction";
import { useMultisignatureAccountSelected } from "@/hooks/multisignatureSelected/useMultisignatureAccountSelected";
import { useAddressInFormatPicked } from "@/hooks/useAddressInFormatPicked";
import { useCustomContractDryRunHandler } from "@/hooks/useContractDryRunHandler";
import { useContractFromMetadata } from "@/hooks/useContractFromMetadata";
import { NextBackButtonStepper } from "@/sections/shared/BaseStepper/NextBackButtonStepper";
import CopyButton from "@/sections/shared/common/CopyButton";
import { FallbackSpinner } from "@/sections/shared/common/FallbackSpinner";
import { MonoTypography } from "@/sections/shared/common/MonoTypography";
import { toIdentityContractIdInput } from "@/services/contracts/transformers/toInputIdentity";
import { getAccountWallet } from "@/services/fuel/connectors/transformer";
import { hex_to_bytes, truncateAddress } from "@/utils/formatString";

import { useTxBuilderContext } from "../../TxBuilderContext/useTxBuilderContext";
import { MethodsForm } from "./MethodsForm";
import { BoxRow } from "./styled";
import { useAbiMethodSelector } from "./useAbiMethodSelector";

export function MethodSelectorStep() {
  const { inputFormManager, managerStep } = useTxBuilderContext();
  const { getValues, control, watch } = inputFormManager;
  const abiMethodSelected = watch("abiMethodSelected");
  const abiSelectedParams = watch("abiMethodParams");
  const { contractAddress, metadataSource } = getValues();
  const router = useRouter();
  const { proposeTransaction } = useProposeTransaction();
  const { multisigSelected } = useMultisignatureAccountSelected();
  const { activeStep, stepsLength, downStep: handleBack } = managerStep;
  const { addressFormatted } = useAddressInFormatPicked({
    accountWallet: contractAddress,
  });
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
  const { selectedAbiMethod, selectedAbiMethodLoading } = useAbiMethodSelector({
    methodName: abiMethodSelected,
    metadataContract,
  });
  const callParams = useMemo(() => {
    if (!selectedAbiMethod || !selectedAbiMethod.interfaceMethod) {
      return;
    }

    return {
      calldata: hex_to_bytes(abiSelectedParams),
      forwarded_gas: 10000000,
      function_selector: selectedAbiMethod.interfaceMethod.selectorBytes,
      transfer_params: {
        asset_id: { bits: BASE_ASSET_ID },
        value: new BigNumber(0).toString(),
      },
    };
  }, [abiSelectedParams, selectedAbiMethod]);

  const { druRunHandler, decodedValue } = useCustomContractDryRunHandler({
    contract: metadataContract,
    methodName: selectedAbiMethod?.interfaceMethod?.name,
    callData: callParams?.calldata || [],
  });

  const _handleNext = useCallback(() => {
    if (!contractAddress || !callParams) {
      return;
    }

    const contractAddressWallet = getAccountWallet(contractAddress);
    proposeTransaction({
      to: toIdentityContractIdInput(contractAddressWallet.bech32),
      params: { Call: callParams },
    }).then((result) => {
      if (result) {
        router.push(ROUTES.App);
      }
    });
  }, [contractAddress, proposeTransaction, callParams, router]);

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
        </>
      ) : (
        selectedAbiMethod &&
        metadataContract && (
          <MethodsForm
            selectedAbiMethod={selectedAbiMethod}
            metadataContract={metadataContract}
            decodedValue={decodedValue}
            dryRunHandler={druRunHandler}
          />
        )
      )}
      <Box p={5}>
        <NextBackButtonStepper
          activeStep={activeStep}
          stepsLength={stepsLength}
          handleBack={handleBack}
          handleNext={_handleNext}
          nextLabel={
            <>
              Propose transaction
              <ArrowRightAltIcon />
            </>
          }
          nextButtonProps={{
            disabled: !selectedAbiMethod || selectedAbiMethod.isReadOnly,
          }}
        />
      </Box>
    </Box>
  );
}
