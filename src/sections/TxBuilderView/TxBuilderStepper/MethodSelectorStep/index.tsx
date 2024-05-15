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
import { hex_to_bytes, truncateAddress } from "@/utils/formatString";

import { useTxBuilderContext } from "../../TxBuilderContext/useTxBuilderContext";
import { MethodsForm } from "./MethodsForm";
import { BoxRow } from "./styled";
import { useAbiMethodSelector } from "./useAbiMethodSelector";
import { getAccountWallet } from "@/services/fuel/connectors/transformer";
import { BASE_ASSET_ID } from "@/config/assetsMap";
import BigNumber from "bignumber.js";
import { ContractCallParamsInput } from "@/services/contracts/multisig/contracts/FuelMultisigAbi";
import { useGetMultisigContract } from "@/hooks/multisigContract/useGetMultisigContract";
import { toIdentityContractIdInput } from "@/services/contracts/transformers/toInputIdentity";
import { getCurrentDatePlusTenDays } from "@/utils/getCurrentDatePlusTenDays";
import { useProposeTransaction } from "@/hooks/multisigContract/useProposeTransaction";

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
  const { proposeTransaction, error, isLoading } = useProposeTransaction();

  async function proposeTx() {
    const contractAddressWallet = getAccountWallet(contractAddress);
    try {
      console.log("Tx: ", callParams);
      // console.log("Contractaddress: ", contractAddress);
      const res = await multisigContract.contract?.functions
        .propose_tx(
          toIdentityContractIdInput(contractAddressWallet.bech32),
          getCurrentDatePlusTenDays(),
          { Call: callParams }
        )
        .call();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  const _handleNext = useCallback(() => {
    if (!selectedAbiMethod || !selectedAbiMethod.interfaceMethod) {
      return;
    }
    const callParams: ContractCallParamsInput = {
      calldata: hex_to_bytes(abiSelectedParams),
      forwarded_gas: 10000000,
      function_selector: hex_to_bytes(
        selectedAbiMethod.interfaceMethod.selector
      ),
      single_value_type_arg: true,
      transfer_params: {
        asset_id: { value: BASE_ASSET_ID },
        value: new BigNumber(0).toString(),
      },
    };
    const contractAddressWallet = getAccountWallet(contractAddress);
    proposeTransaction({
      to: toIdentityContractIdInput(contractAddressWallet.bech32),
      params: { Call: callParams },
    });
  }, [
    selectedAbiMethod,
    abiSelectedParams,
    contractAddress,
    proposeTransaction,
  ]);

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
